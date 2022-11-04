import postgres from "pg";
const { Client } = postgres;

export const client = new Client({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "1234",
  database: "postgres",
});
await client.connect();
