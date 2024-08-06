import express from "express";
import { chats } from "./Data/data.js";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from 'body-parser';
import colors from "colors";
import db from './config/db.js'
import userRoute from './routes/userRoute.js';
import chatRoute from './routes/chatRoute.js';
import messageRoute from './routes/messageRoute.js';
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

const app = express();
dotenv.config();
app.use(bodyParser.json());

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, 
};

app.use(cors(corsOptions));


app.get("/", (req, res) => {
  res.send("Hello i am good");
});

app.use('/api/user', userRoute);
app.use('/api/chat', chatRoute);
app.use( '/api/message', messageRoute);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 8080;
app.listen(port, (req, res) => {
  console.log(`server listening on port ${port}`. yellow.bold);
});
