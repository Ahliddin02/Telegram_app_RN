import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

import { client } from "./db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const router = express.Router();
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json());
app.use("/", router);
const port = 8080;

//get
app.get("/file-contacts", async (req, res) => {
  await client.connect();
  const result = await client.query("SELECT * FROM contacts");
  await client.end();
  res.send(result.rows);
  console.log(result.rows);
});
router.get("/file-list/:filename", (req, res) => {
  res.sendFile(path.join(__dirname, "/port", `${req.params.filename}`));
});
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
/////////-------------MESSAGES CONTACTS ------------
////////-----Messages--///
//post
app.post("/messages-save", async (req, res) => {
  await client.connect();
  await client.query(`INSERT INTO messages(text, sender, receiver) VALUES ($1,$2,$3)`, [
    req.body.text,
    req.body.sender,
    req.body.receiver,
  ]);
  await client.end();
  res.send("Send message to save in /messages-list");
});

//get
app.get("/messages-list", async (req, res) => {
  await client.connect();
  const resultmessage = await client.query("SELECT * FROM messages");
  await client.end();
  res.send(resultmessage.rows);
  console.log(resultmessage.rows);
});
