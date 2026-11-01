"use strict";

// Packages & helpers
import express, {
  type Express,
  type NextFunction,
  type Request,
  type Response,
} from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import { isValidNewEntry } from "./utils/isValidNewEntry.ts";

// Types
import type { PartialEntryType, NewEntryType } from "./types/EntryType.ts";
import {
  createEntry,
  deleteEntry,
  getEntries,
  getEntry,
  updateEntry,
} from "./services/pgEntries.ts";

// Create server object
const app: Express = express();
const PORT = 3000;

// Middleware
app.use(morgan("tiny")); // Logging
app.use(bodyParser.json()); // Body parsing

app.get("/", (req: Request, res: Response) => {
  // Eventually will be a home page for now it functions kind of like a health check.
  res.send("Hello World!");
});

app.get("/entries", async (req: Request, res: Response) => {
  // Serve entries
  try {
    let entries = await getEntries();

    if (entries.length > 0) {
      res.statusCode = 200;
      res.json(entries);
    } else {
      res.statusCode = 200;
      res.json([]);
    }
  } catch (e) {
    console.error(e);
    res.statusCode = 500;
    res.send("Something went wrong.");
  } finally {
    return;
  }
});

app.get("/entries/:entryId", async (req: Request, res: Response) => {
  // Serve a single entry
  try {
    let entryId = Number(req.params.entryId);
    let entry = await getEntry(entryId);

    if (entry !== undefined) {
      res.statusCode = 200;
      res.json(entry);
    } else {
      res.statusCode = 404;
      res.send("Entry not found.");
    }
  } catch (e) {
    console.error(e);
    res.statusCode = 500;
    res.send("Something went wrong.");
  } finally {
    return;
  }
});

app.post("/entries", async (req: Request, res: Response) => {
  // Create a new entry
  let body: NewEntryType = req.body;

  // Validate request body
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
      progress: body?.progress,
      total_length: body.total_length,
      progress_type: body.progress_type,
      user_rating: body?.user_rating || null,
      review: body?.review || null,
      liked: body.liked,
    };

    try {
      let createdEntry = await createEntry(entry);

      if (createdEntry !== undefined) {
        res.statusCode = 201;
        res.json(createdEntry);
      } else {
        res.statusCode = 500;
        res.send("Something went wrong.");
      }
    } catch (e) {
      console.error(e);
      res.statusCode = 500;
      res.send("Something went wrong.");
    } finally {
      return;
    }
  } else {
    res.statusCode = 400;
    res.send("Failed to create new entry.");
    return;
  }
});

app.patch("/entries/:entryId", async (req: Request, res: Response) => {
  // Update an entry
  let entryId: number = Number(req.params.entryId);
  let edits: PartialEntryType = req.body;
  edits.last_edited_date = new Date().toJSON();

  try {
    let entryUpdated: boolean = await updateEntry(entryId, edits);

    if (entryUpdated) {
      let result = await getEntry(entryId);
      res.statusCode = 200;
      res.json(result);
    } else {
      res.statusCode = 404;
      res.send("Entry not found.");
    }
  } catch (e) {
    console.error(e);
    res.statusCode = 500;
    res.send("Something went wrong.");
  } finally {
    return;
  }
});

app.delete("/entries/:entryId", async (req: Request, res: Response) => {
  // Delete an entry
  try {
    let entryId: number = Number(req.params.entryId);
    let deleted: boolean = await deleteEntry(entryId);

    if (deleted) {
      res.statusCode = 204;
      res.send();
    } else {
      res.statusCode = 404;
      res.send("Entry not found.");
    }
  } catch (e) {
    console.error(e);
    res.statusCode = 500;
    res.send("Something went wrong.");
  } finally {
    return;
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
