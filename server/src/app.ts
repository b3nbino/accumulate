import express, { type Express, type Request, type Response } from "express";
import morgan from "morgan";
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

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.get("/entries", (req: Request, res: Response) => {
  res.json(ENTRIES);
});

app.listen(PORT, () => {
  console.log(`Example app listening on PORT ${PORT}`);
});
