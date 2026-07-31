"use strict";

// Packages
import express, { type Express, type Request, type Response } from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import { isValidNewEntry } from "./helpers/isValidNewEntry.js";

// Types
import type { Entry, NewEntry } from "./types/entries.js";

const app: Express = express();
const PORT = 3000;
const ENTRIES: Entry[] = [
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

    res.json(ENTRIES);
  } else {
    console.log("400: Bad request");

    res.statusCode = 400;
    res.send("There was a problem with your request.");
    return;
  }
});

// FIX ME: Add global error handler

app.listen(PORT, () => {
  console.log(`Example app listening on PORT ${PORT}`);
});
