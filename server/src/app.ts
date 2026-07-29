import express, { type Express, type Request, type Response } from "express";
import morgan from "morgan";

const app: Express = express();
const port = 3000;

app.use(morgan("tiny"));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
