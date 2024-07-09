
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { BACKEND_URL } from '../utils/constant';

const ChatPage = () => {

  const [chats, setChats] = useState([]);

  const fetchChats = async() =>{
    const res = await axios.get(`${BACKEND_URL}/api/chats`);
    const chat = res.data; 
    setChats(chat);
  }

  useEffect(()=>{
    fetchChats();
  }, []);

  return (
    <div>

       {chats.length === 0 ? <h1>Loading.....</h1> :
        chats.map((chat)=>(
        <div key={chat._id}>{chat.chatName}</div>
      ))}
    </div>
  )
}

export default ChatPage
