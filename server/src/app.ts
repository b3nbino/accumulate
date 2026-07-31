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
import { isValidNewEntry } from "./helpers/isValidNewEntry.js";

// Types
import type { Entry, NewEntry, PartialEntry } from "./types/entries.js";

const app: Express = express();
const PORT = 3000;
let ENTRIES: Entry[] = [
  {
    id: 1,
    db_id: 1,
    title: "Baby Driver",
    release_date: "March 11th, 2017",
    start_date: "July 7th, 2026",
    finish_date: "July 7th, 2026",
    status: "completed",
    progress: "100%",
    user_rating: 10,
    review: "",
    liked: true,
    tags: ["soundtrack", "driving"],
  },
];

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

app.post("/entries", (req: Request, res: Response) => {
  // Validate request bodies, then add them to entries
  let body: NewEntry = req.body;

  if (isValidNewEntry(body)) {
    let id = Math.floor(Math.random() * 1000) + 1;

    // Extract the properties we want, which are validated, extra fields could be a security flaw
    let entry: Entry = {
      id,
      db_id: body.db_id,
      title: body.title,
      release_date: body.release_date,
      start_date: body?.start_date,
      finish_date: body?.finish_date,
      status: body.status,
      progress: body?.progress,
      user_rating: body?.user_rating,
      review: body?.review,
      liked: body.liked,
      tags: body?.tags,
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

  if (ENTRIES.some((entry) => entry.id === entryId)) {
    let edits: PartialEntry = req.body;

    for (let prop in edits) {
      // Could be a switch statement but oops...
      if (prop === "db_id" && typeof edits[prop] === "number") {
        let currEntry = ENTRIES.find((entry) => entry.id === entryId);
        if (currEntry !== undefined) {
          currEntry[prop] = edits[prop];
        }
      } else if (prop === "title" && typeof edits[prop] === "string") {
        let currEntry = ENTRIES.find((entry) => entry.id === entryId);
        if (currEntry !== undefined) {
          currEntry[prop] = edits[prop];
        }
      } else if (prop === "release_date" && typeof edits[prop] === "string") {
        let currEntry = ENTRIES.find((entry) => entry.id === entryId);
        if (currEntry !== undefined) {
          currEntry[prop] = edits[prop];
        }
      } else if (
        prop === "start_date" &&
        (typeof edits[prop] === "string" || typeof edits[prop] === "undefined")
      ) {
        let currEntry = ENTRIES.find((entry) => entry.id === entryId);
        if (currEntry !== undefined) {
          currEntry[prop] = edits[prop];
        }
      } else if (
        prop === "finish_date" &&
        (typeof edits[prop] === "string" || typeof edits[prop] === "undefined")
      ) {
        let currEntry = ENTRIES.find((entry) => entry.id === entryId);
        if (currEntry !== undefined) {
          currEntry[prop] = edits[prop];
        }
      } else if (prop === "status" && typeof edits[prop] === "string") {
        let currEntry = ENTRIES.find((entry) => entry.id === entryId);
        if (currEntry !== undefined) {
          currEntry[prop] = edits[prop];
        }
      } else if (
        prop === "progress" &&
        (typeof edits[prop] === "string" || typeof edits[prop] === "undefined")
      ) {
        let currEntry = ENTRIES.find((entry) => entry.id === entryId);
        if (currEntry !== undefined) {
          currEntry[prop] = edits[prop];
        }
      } else if (
        prop === "user_rating" &&
        (typeof edits[prop] === "number" || typeof edits[prop] === "undefined")
      ) {
        let currEntry = ENTRIES.find((entry) => entry.id === entryId);
        if (currEntry !== undefined) {
          currEntry[prop] = edits[prop];
        }
      } else if (
        prop === "review" &&
        (typeof edits[prop] === "string" || typeof edits[prop] === "undefined")
      ) {
        let currEntry = ENTRIES.find((entry) => entry.id === entryId);
        if (currEntry !== undefined) {
          currEntry[prop] = edits[prop];
        }
      } else if (prop === "liked" && typeof edits[prop] === "boolean") {
        let currEntry = ENTRIES.find((entry) => entry.id === entryId);
        if (currEntry !== undefined) {
          currEntry[prop] = edits[prop];
        }
      } else if (
        prop === "tags" &&
        ((Array.isArray(edits[prop]) &&
          edits[prop].every((elem) => typeof elem === "string")) ||
          typeof edits[prop] === "undefined")
      ) {
        let currEntry = ENTRIES.find((entry) => entry.id === entryId);
        if (currEntry !== undefined) {
          currEntry[prop] = edits[prop];
        }
      } else {
        // Extra properties
        // res.statusCode = 400;
        // res.send("Failed to edit resource.");
        // return;
      }
    }

    res.statusCode = 200;
    res.json(ENTRIES[entryId]);
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
    ENTRIES = ENTRIES.filter((entry) => entry.id !== entryId);

    res.statusCode = 200;
    res.json(ENTRIES);
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
