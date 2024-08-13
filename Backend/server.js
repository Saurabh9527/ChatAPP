import express from "express";
import { chats } from "./Data/data.js";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import colors from "colors";
import db from "./config/db.js";
import userRoute from "./routes/userRoute.js";
import chatRoute from "./routes/chatRoute.js";
import messageRoute from "./routes/messageRoute.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import { Server } from "socket.io";
import http from "http";
import { log } from "console";
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

app.use("/api/user", userRoute);
app.use("/api/chat", chatRoute);
app.use("/api/message", messageRoute);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 8080;

const server = http.createServer(app);

const io = new Server(server, {
  pingTimeout: 60000, //wait for 60 second to determine if a client is still connected to the server save the bandwidth
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("connected to socket.io");

  socket.on("setup", (userData) => {
    // console.log(userData);
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User joined " + room);
  });

  socket.on("typing", (room) => (
    //console.log(room), 
    socket.in(room).emit("typing")
  ));
  socket.on("stop typing", (room) => (
    socket.in(room).emit("stop typing")
  ));

  socket.on("new message", (newMessageRecieved) => {
  // console.log(newMessageRecieved);
    var chat = newMessageRecieved.chat;
   //console.log(chat)
    if(!chat.users) console.log("chat users not defined");

    chat.users.forEach((user) => {
      if(user._id == newMessageRecieved.sender._id)return ;  //* this means except me send to the message to all users
      
      socket.in(user._id).emit("message received", newMessageRecieved);  //* send the message to all users
    });
  });

  //clean up socket
  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id)
  });

});

server.listen(port, (req, res) => {
  console.log(`server listening on port ${port}`.yellow.bold);
});
