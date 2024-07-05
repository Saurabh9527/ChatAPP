import express from "express";
import { chats } from "./Data/data.js";
import dotenv from "dotenv";
import cors from "cors";
import colors from "colors";
import db from './config/db.js'

const app = express();
dotenv.config();

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, 
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Hello i am good");
});

app.get("/api/chats", (req, res) => {
  res.send(chats);
});

app.get("/api/chats/:id", (req, res) => {
  console.log(req.params.id);
  const findChats = chats.find((chatId) => chatId._id === req.params.id);
  res.send(findChats);
});

const port = process.env.PORT || 8080;
app.listen(port, (req, res) => {
  console.log(`server listening on port ${port}`. yellow.bold);
});
