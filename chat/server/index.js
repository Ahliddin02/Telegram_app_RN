const express = require("express");
const multer = require("multer");
const cors = require("cors");
const postgres = require("pg");
const app = express();
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const { Client } = postgres;
const router = express.Router();
const port = 8080;

app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json());
app.use("/", router);
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
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
    await client.query("INSERT INTO images(imagename) VALUES($1)", [req.files[0].filename]);
    await client.end();
  });
});
//get
app.get("/file-images", async (req, res) => {
  const client = new Client({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "1234",
    database: "postgres",
  });
  await client.connect();
  const result = await client.query("SELECT * FROM images");
  await client.end();
  // console.log(result.rows);
  res.send(result.rows);
});
router.get("/file-list/:filename", (req, res) => {
  res.sendFile(path.join(__dirname, "/public", `${req.params.filename}`));
});
// get JOIN
app.get("/postList", async (req, res) => {
  const client = new Client({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "1234",
    database: "postgres",
  });
  await client.connect();
  const result = await client.query("SELECT * FROM contacts JOIN images ON contacts.id = images.id ");
  await client.end();
  // console.log(result.rows);
  res.send(result.rows);
});
app.listen(port, () => {
  console.log(`Example app ${port} `);
});
///////////////////
//---Messages, Contacts ----//
////////-----Messages--///
//post
app.post("/messages-save", async (req, res) => {
  const clientmessage = new Client({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "1234",
    database: "postgres",
  });
  await clientmessage.connect();
  await clientmessage.query(`INSERT INTO messages(text, sender, receiver) VALUES ($1,$2,$3)`, [
    req.body.text,
    req.body.sender,
    req.body.receiver,
  ]);
  await clientmessage.end();
  res.send("Send message to save in /messages-list");
});
//get
app.get("/messages-list", async (req, res) => {
  const clientmessage = new Client({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "1234",
    database: "postgres",
  });
  await clientmessage.connect();
  const resultmessage = await clientmessage.query('SELECT * FROM "messages"');
  await clientmessage.end();
  res.send(resultmessage.rows);
});
//-----Contacts--/////
//post
app.post("/contacts-save", async (req, res) => {
  const client = new Client({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "1234",
    database: "postgres",
  });
  await client.connect();
  await client.query(`INSERT INTO contacts(name) VALUES ($1)`, [req.body.name]);
  await client.end();
  res.send("Add Contact to save");
});
//get
app.get("/contacts-list", async (req, res) => {
  const client = new Client({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "1234",
    database: "postgres",
  });
  await client.connect();
  const result = await client.query(`SELECT * FROM "contacts"`);
  await client.end();
  res.send(result.rows);
});
