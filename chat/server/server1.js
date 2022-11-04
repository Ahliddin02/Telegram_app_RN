import express from "express";
import multer from "multer";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
// import { client } from "./db.js";
import postgres from "pg";
const { Client } = postgres;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
app.use(cors());
const router = express.Router();
app.use(express.static(path.join(__dirname, "users")));
app.use(express.json());
app.use("/", router);
const PORT = 7000;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "users");
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4() + "-" + file.originalname);
  },
});

const upload = multer({ storage }).array("file");
//post
app.post("/file-save", (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json(err);
    }
    const client = new Client({
      host: "localhost",
      port: 5432,
      user: "postgres",
      password: "1234",
      database: "postgres",
    });
    await client.connect();
    await client.query(`UPDATE contacts SET imagename='${JSON.stringify(req.files[0].filename)}' WHERE id=10`);
    // await client.query("INSERT INTO image(imagename) VALUES($1)", [req.files[0].filename]);
    await client.end();
  });
});
//get
app.get("/file-contacts", async (req, res) => {
  const client = new Client({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "1234",
    database: "postgres",
  });
  await client.connect();
  const result = await client.query("SELECT * FROM contacts");
  await client.end();
  res.send(result.rows);
  console.log("CONTACTS", result.rows);
});
router.get("/file-list/:filename", (req, res) => {
  res.sendFile(path.join(__dirname, "/users", `${req.params.filename}`));
});
app.listen(PORT, () => {
  console.log(`React Native port ${PORT} `);
});
/////////-------------MESSAGES CONTACTS ------------
////////-----Messages--///
//post
app.post("/messages-save", async (req, res) => {
  const client = new Client({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "1234",
    database: "postgres",
  });
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
  const client = new Client({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "1234",
    database: "postgres",
  });
  await client.connect();
  const resultmessage = await client.query("SELECT * FROM messages");

  await client.end();
  res.send(resultmessage.rows);
  console.log("messagesss", resultmessage.rows);
});
