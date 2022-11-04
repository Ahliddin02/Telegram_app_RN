import express, { Application, Request, Response } from "express";
import multer from "multer";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { client } from "./db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app: Application = express();
app.use(cors());
const router = express.Router();
app.use(express.static(path.join(__dirname, "users")));
app.use(express.json());
const PORT = 8000;
app.use("/", router);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "users");
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4() + "-" + file.originalname);
  },
});
const upload = multer({ storage }).array("file");

// post
app.post("/file-save", async (req: Request, res: Response) => {
  upload(req, res, async (err: any) => {
    if (err) {
      return res.status(500).json(err);
    }
    await client.query("INSERT INTO users(imagename) VALUES($1)", [req.files[0].filename]);
  });
});
//get
app.get("/file-contacts", async (req, res) => {
  const result = await client.query("SELECT * FROM users");
  res.send(result.rows);
  console.log("CONTACTS----", result.rows);
});

// router.get("/file-list/:filename", (req, res) => {
//   res.sendFile(path.join(__dirname.replace("\\src", ""), "\\users", `${req.params.filename}`));
// });
app.get("/:filename", (req, res) => {
  res.sendFile(path.join(__dirname.replace("\\src", ""), "\\users", `${req.params.filename}`));
});

app.use(express.static(__dirname.replace("\\src", "") + "\\users"));

/////////-------------MESSAGES CONTACTS ------------
app.post("/messages-save", async (req, res) => {
  await client.query(`INSERT INTO messages(text, sender, receiver) VALUES ($1,$2,$3)`, [
    req.body.text,
    req.body.sender,
    req.body.receiver,
  ]);
  res.send("Send message to save in messages-list");
});

//get
app.get("/messages-list", async (req, res) => {
  const resultmessage = await client.query("SELECT * FROM messages");
  res.send(resultmessage.rows);
  console.log("messagesss", resultmessage.rows);
});
app.listen(PORT, () => {
  console.log(`React Native port ${PORT} `);
});
