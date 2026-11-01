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
import type {
  PartialEntryType,
  NewEntryType,
  EntryType,
} from "./types/EntryType.ts";
import { psql } from "./services/pgEntries.ts";

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
    const entries: EntryType[] = await psql.entries.getEntries();

    if (entries.length > 0) {
      res.statusCode = 200;
      res.json(entries);
    } else {
      res.statusCode = 200;
      res.json([]);
    }
  } catch (e: unknown) {
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
    const entryId: number = Number(req.params.entryId);
    const entry: EntryType = await psql.entries.getEntry(entryId);

    if (entry !== undefined) {
      res.statusCode = 200;
      res.json(entry);
    } else {
      res.statusCode = 404;
      res.send("Entry not found.");
    }
  } catch (e: unknown) {
    console.error(e);
    res.statusCode = 500;
    res.send("Something went wrong.");
  } finally {
    return;
  }
});

app.post("/entries", async (req: Request, res: Response) => {
  // Create a new entry
  const body: NewEntryType = req.body;

  // Validate request body
  if (isValidNewEntry(body)) {
    // Extract the properties we want, which are validated, extra fields could be a vulnerability
    const entry: NewEntryType = {
      media_id: body.media_id,
      source: body.source,
      media_type: body.media_type,
      title: body.title,
      last_edited_date: new Date().toJSON(),
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
      const createdEntry = await psql.entries.createEntry(entry);

      if (createdEntry !== undefined) {
        res.statusCode = 201;
        res.json(createdEntry);
      } else {
        res.statusCode = 500;
        res.send("Something went wrong.");
      }
    } catch (e: unknown) {
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
  const entryId: number = Number(req.params.entryId);
  let edits: PartialEntryType = req.body;
  edits.last_edited_date = new Date().toJSON();

  try {
    const entryUpdated: boolean = await psql.entries.updateEntry(
      entryId,
      edits,
    );

    if (entryUpdated) {
      const result: EntryType = await psql.entries.getEntry(entryId);
      res.statusCode = 200;
      res.json(result);
    } else {
      res.statusCode = 404;
      res.send("Entry not found.");
    }
  } catch (e: unknown) {
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
    const entryId: number = Number(req.params.entryId);
    const deleted: boolean = await psql.entries.deleteEntry(entryId);

    if (deleted) {
      res.statusCode = 204;
      res.send();
    } else {
      res.statusCode = 404;
      res.send("Entry not found.");
    }
  } catch (e: unknown) {
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
