import asyncHandler from "express-async-handler";
import Message from '../models/messageModel.js';
import User from "../models/userModel.js";
import Chat from "../models/chatModel.js";

export const sendMessage = asyncHandler(async (req, res) => {
  const { chatId, content } = req.body;


  if (!chatId || !content) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  const newMessage = {
        sender: req.user._id,
        content: content,
        chat: chatId,
  };

  try {

    let message = await Message.create(newMessage);
    message = await message.populate("sender", "name avatar");
    message = await message.populate("chat");
    message = await User.populate(message,{
            path: "chat.users",
            select: "name avatar email",
    });

    await Chat.findByIdAndUpdate(req.body.chatId, {
        latestMessage: message,
    });

    res.json(message);

  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

export const allMessages = asyncHandler (async (req, res) => {

    try {
        
        const messages = await Message.find( {chat: req.params.chatId } )
        .populate("sender" , "name avatar email")
        .populate("chat");

        res.json(messages);
    } catch (error) {
            res.status(400);
            throw new Error(error.message);
    }
})
