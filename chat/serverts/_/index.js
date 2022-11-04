"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const cors_1 = __importDefault(require("cors"));
const uuid_1 = require("uuid");
const path_1 = __importDefault(require("path"));
const path_2 = require("path");
// import { client } from "./db.js";
const pg_1 = __importDefault(require("pg"));
const { Client } = pg_1.default;
// const __;
const __dirname = (0, path_2.dirname)(__filename);
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const router = express_1.default.Router();
app.use(express_1.default.static(path_1.default.join(__dirname, "users")));
app.use(express_1.default.json());
app.use("/", router);
const PORT = 7000;
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "users");
    },
    filename: (req, file, cb) => {
        cb(null, (0, uuid_1.v4)() + "-" + file.originalname);
    },
});
const upload = (0, multer_1.default)({ storage }).array("file");
//post
app.post("/file-save", (req, res) => {
    upload(req, res, (err) => __awaiter(void 0, void 0, void 0, function* () {
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
        yield client.connect();
        yield client.query(`UPDATE contacts SET imagename='${JSON.stringify(req.files[0].filename)}' WHERE id=10`);
        // await client.query("INSERT INTO image(imagename) VALUES($1)", [req.files[0].filename]);
        yield client.end();
    }));
});
//get
app.get("/file-contacts", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const client = new Client({
        host: "localhost",
        port: 5432,
        user: "postgres",
        password: "1234",
        database: "postgres",
    });
    yield client.connect();
    const result = yield client.query("SELECT * FROM contacts");
    yield client.end();
    res.send(result.rows);
}));
router.get("/file-list/:filename", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "/users", `${req.params.filename}`));
});
app.listen(PORT, () => {
    console.log(`React Native port ${PORT} `);
});
console.log("Hello!");
console.log([1, 2, 3]);
