"use strict";

// Packages
import express, { type Express, type Request, type Response } from "express";
import morgan from "morgan";
import bodyParser from "body-parser";

// Types
import type { Entry } from "./types.js";

const app: Express = express();
const PORT = 3000;
const ENTRIES: Entry[] = [
  {
    id: 1,
    movie_id: 1,
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
  let body = req.body;
  console.log(body);
  res.send("Recieved a request!");
});

// FIX ME: Add global error handler

app.listen(PORT, () => {
  console.log(`Example app listening on PORT ${PORT}`);
});
