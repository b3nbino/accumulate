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
import type {
  EntryType,
  PartialEntryType,
  NewEntryType,
} from "./types/EntryType.js";
import {
  createEntry,
  deleteEntry,
  getEntries,
  getEntry,
  updateEntry,
} from "./services/pgEntries.ts";

const app: Express = express();
const PORT = 3000;

app.use(morgan("tiny"));
app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
  // Eventually will be a home page
  res.send("Hello World!");
});

app.get("/entries", async (req: Request, res: Response) => {
  // Serve entries
  try {
    let entries = await getEntries();
    res.statusCode = 200;
    res.json(entries);
  } catch (e) {
    console.error(e);
    res.statusCode = 400;
    res.send("Failed to get entries.");
    return;
  }
});

app.get("/entries/:entryId", async (req: Request, res: Response) => {
  // Serve a single entry
  try {
    let entryId = Number(req.params.entryId);
    let entry = await getEntry(entryId);
    res.statusCode = 200;
    res.json(entry);
  } catch (e) {
    console.error(e);
    res.statusCode = 400;
    res.send("Failed to get entry.");
    return;
  }
});

app.post("/entries", async (req: Request, res: Response) => {
  // Validate request bodies, then add them to entries
  let body: NewEntryType = req.body;

  if (isValidNewEntry(body)) {
    let lastEdited = new Date().toJSON();

    // Extract the properties we want, which are validated, extra fields could be a security flaw
    let entry: NewEntryType = {
      media_id: body.media_id,
      source: body.source,
      media_type: body.media_type,
      title: body.title,
      last_edited_date: lastEdited,
      release_date: body.release_date,
      start_date: body?.start_date || null,
      finish_date: body?.finish_date || null,
      status: body.status,
      progress: body?.progress || null,
      total_length: body.total_length,
      progress_type: body.progress_type,
      user_rating: body?.user_rating || null,
      review: body?.review || null,
      liked: body.liked,
    };

    try {
      let entryCreated = await createEntry(entry);

      if (entryCreated) {
        res.statusCode = 201;
        res.send("Entry successfully created.");
      } else {
        throw new Error("Entry failed to create.");
      }
    } catch (e) {
      console.error(e);
      res.statusCode = 400;
      res.send("There was a problem with your request.");
    }
  }
});

app.patch("/entries/:entryId", async (req: Request, res: Response) => {
  let entryId: number = Number(req.params.entryId);
  let edits: PartialEntryType = req.body;
  edits.last_edited_date = new Date().toJSON();

  try {
    let entryUpdated = await updateEntry(entryId, edits);

    if (entryUpdated) {
      let result = await getEntry(entryId);
      res.statusCode = 200;
      res.json(result);
    } else {
      throw new Error("Entry failed to update.");
    }
  } catch (e) {
    console.error(e);
    res.statusCode = 400;
    res.send("There was a problem with your request.");
  }
});

app.delete("/entries/:entryId", async (req: Request, res: Response) => {
  try {
    let entryId: number = Number(req.params.entryId);
    let deleted: boolean = await deleteEntry(entryId);

    if (deleted) {
      res.statusCode = 200;
      res.send("Entry deleted.");
    } else {
      res.statusCode = 404;
      res.send("Entry does not exist.");
    }
  } catch {
    res.statusCode = 500;
    res.send("Failed to delete entry.");
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
