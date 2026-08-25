import { Client } from "pg";

const CLIENT_CONFIG = {
  user: "postgres",
  password: "postgres",
  database: "accumulate",
};

export default async function pgQuery(query, ...parameters) {
  let pg = await new Client(CLIENT_CONFIG).connect();
  try {
    console.log(query, parameters);
    let result = await pg.query(query, parameters);
    return result;
  } catch {
    throw new Error("PG connection failed.");
  } finally {
    await pg.end();
  }
}
