"use strict";

// Packages
import express, {
  type Express,
  type NextFunction,
  type Request,
  type Response,
} from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import { ENTRIES } from "./data.ts";
import { isValidNewEntry } from "./helpers/isValidNewEntry.js";

// Types
import type {
  EntryType,
  PartialEntryType,
  NewEntryType,
} from "./types/EntryType.js";

const app: Express = express();
const PORT = 3000;

app.use(morgan("tiny"));
app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
  // Eventually will be a home page
  res.send("Hello World!");
});

app.get("/entries", (req: Request, res: Response) => {
  // Serve entries
  res.json(ENTRIES);
});

app.get("/entries/:entryId", (req: Request, res: Response) => {
  // Serve a single entry

  let entryId = Number(req.params.entryId);
  res.json(ENTRIES.find((entry) => entry.id === entryId));
});

app.post("/entries", (req: Request, res: Response) => {
  // Validate request bodies, then add them to entries
  let body: NewEntryType = req.body;

  if (isValidNewEntry(body)) {
    let id = Math.floor(Math.random() * 1000) + 1;
    let lastEdited = new Date().toJSON();

    // Extract the properties we want, which are validated, extra fields could be a security flaw
    let entry: EntryType = {
      id,
      media_id: body.media_id,
      source: body.source,
      type: body.type,
      title: body.title,
      last_edited_date: lastEdited,
      release_date: body.release_date,
      start_date: body?.start_date,
      finish_date: body?.finish_date,
      status: body.status,
      progress: body?.progress,
      total_length: body.total_length,
      progress_type: body.progress_type,
      user_rating: body?.user_rating,
      review: body?.review,
      liked: body.liked,
    };

    // Add to entries
    ENTRIES.push(entry);

    res.statusCode = 201;
    res.json(ENTRIES);
  } else {
    console.log("400: Bad request");
    res.statusCode = 400;
    res.send("There was a problem with your request.");
  }
});

app.patch("/entries/:entryId", (req: Request, res: Response) => {
  let entryId: number = Number(req.params.entryId);
  let edits: PartialEntryType = req.body;
  let currEntry: EntryType | undefined = ENTRIES.find(
    (entry) => entry.id === entryId,
  );
  const MAX_SAFE_INTEGER = 9007199254740991;

  if (currEntry) {
    for (let prop in edits) {
      switch (prop) {
        case "start_date":
          if (
            typeof edits[prop] === "string" ||
            typeof edits[prop] === "undefined"
          ) {
            currEntry[prop] = edits[prop];
          }
          break;
        case "finish_date":
          if (
            typeof edits[prop] === "string" ||
            typeof edits[prop] === "undefined"
          ) {
            currEntry[prop] = edits[prop];
          }
          break;
        case "status":
          if (
            edits[prop] === "completed" ||
            edits[prop] === "dropped" ||
            edits[prop] === "on-hold" ||
            edits[prop] === "plan to watch" ||
            edits[prop] === "watching"
          ) {
            currEntry[prop] = edits[prop];
          }
          break;
        case "progress":
          if (
            typeof edits[prop] === "number" &&
            edits[prop] < MAX_SAFE_INTEGER
          ) {
            if (
              "total_length" in currEntry &&
              typeof currEntry.total_length === "number" &&
              edits[prop] <= currEntry.total_length &&
              edits[prop] >= 0
            ) {
              currEntry[prop] = edits[prop];
            } else {
              res.statusCode = 400;
              res.send("Cannot update entry.");
              return;
            }
          }
          break;
        case "user_rating":
          if (
            (typeof edits[prop] === "number" && edits[prop] <= 10) ||
            typeof edits[prop] === "undefined"
          ) {
            currEntry[prop] = edits[prop];
          }
          break;
        case "review":
          if (
            typeof edits[prop] === "string" ||
            typeof edits[prop] === "undefined"
          ) {
            currEntry[prop] = edits[prop];
          }
          break;
        case "liked":
          if (typeof edits[prop] === "boolean") {
            currEntry[prop] = edits[prop];
          }
          break;
        default:
        // Extra properties
        // res.statusCode = 400;
        // res.send("Failed to edit resource.");
        // return;
      }
    }

    currEntry.last_edited_date = new Date().toJSON();

    res.statusCode = 200;
    res.json(ENTRIES[ENTRIES.findIndex((entry) => entry.id === entryId)]);
  } else {
    console.log("Error updating resouce.");
    res.statusCode = 404;
    res.send("Failed to edit resource.");
  }
});

app.delete("/entries/:entryId", (req: Request, res: Response) => {
  let entryId: number = Number(req.params.entryId);

  // Make sure the resouce exists
  if (ENTRIES.some((entry) => entry.id === entryId)) {
    ENTRIES.splice(
      ENTRIES.findIndex((entry) => entry.id === entryId),
      1,
    );

    res.statusCode = 200;
    res.send("Entry deleted");
  } else {
    console.log("Error deleting entry.");
    res.statusCode = 404;
    res.send("Failed to delete resouce.");
  }
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500);
  res.render("error", { error: err });
});

app.listen(PORT, () => {
  console.log(`Example app listening on PORT ${PORT}`);
});
