
import React, { useContext, useEffect, useState } from 'react'
import { ChatContext } from '../Context/ChatProvider';
import { Box, FormControl, IconButton, Input, Spinner, Text, useToast } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { getSender , getSenderFull } from '../utils/ChatLogics';
import ProfileModal from './ProfileModal';
import UpdateGroupChatmodal from './UpdateGroupChatmodal';
import { BACKEND_URL } from '../utils/constant';
import axios from 'axios';
import ChatWindow from './ChatWindow';
import io from 'socket.io-client';
import './style.css'
var socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {

    const { user, selectedChat, setSelectedChat, notification, setNotification } = useContext(ChatContext);
    const [message, setMessage] = useState([]);    
    const [loading, setLoading] = useState(false);    
    const [newMessage, setNewMessage] = useState('');  
    const [socketConnected, setSocketConnected] = useState(false);  
    const [typing, setTyping] = useState(false);  
    const [isTyping, setIsTyping] = useState(false);  

    const toast = useToast();
    
    const fetchMessages = async () => {
        if(!selectedChat) return;

        setLoading(true);
        try {
            const res = await axios.get(`${BACKEND_URL}/api/message/${selectedChat._id}`, 
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${user.token}`,
                    },
                })
                const { data } = res;
               // console.log(message);
                
                setMessage(data);
                setLoading(false);
                socket.emit('join chat', selectedChat._id);
        } catch (error) {
            toast({
                title: 'Error Occured',
                description:"Failed to send the Message",
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            })
        }
    }

    const sendMessage = async (e) => {
        if(e.key === "Enter" && newMessage) {
            socket.emit("stop typing", selectedChat._id)

            try {
                const res = await axios.post(`${BACKEND_URL}/api/message`, 
                    {  
                        content: newMessage, 
                        chatId: selectedChat._id,
                    },
                    {
                        withCredentials: true,
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${user.token}`,
                        },
                    })
                    const { data } = res;
                   // console.log(data);
                    socket.emit("new message", data);                 
                    setNewMessage("");
                    setMessage([...message, data])
            } catch (error) {
                toast({
                    title: 'Error Occured',
                    description:"Failed to send the Message",
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                    position: 'bottom'
                })
            }
        }
    }

    const typingHandler = (e) => {
        
        setNewMessage(e.target.value);

        // typing indicator logic
        if(!socketConnected) return ;
        if(!typing) {
            setTyping(true);
            socket.emit("typing", selectedChat._id)
        }

        let lastTypingTime = new Date().getTime(); // we use debouncing stop the typing indicator after 3 second when user stop the typing
        let timerLength = 3000;
        setTimeout( () => {
            const timeNow = new Date().getTime();
            const timeDiff = timeNow - lastTypingTime; //
            if(timeDiff >= timerLength && typing){
                socket.emit("stop typing", selectedChat._id);
                setTyping(false);
            }
        }, timerLength)
    };

    useEffect(() => {
        socket = io(BACKEND_URL);
        socket.emit("setup", user);
        socket.on("connected", () =>(
            setSocketConnected(true)
        ));
        socket.on("typing", () => setIsTyping(true))
        socket.on("stop typing", () => setIsTyping(false))
    }, []);

    useEffect( () => {
       // console.log("FEtch Message");
        
        fetchMessages();
        selectedChatCompare = selectedChat;
    }, [selectedChat])



    useEffect(() => {
         socket.on("message received", (newMessageReceived) => { 
            //TODO: save notification message in database           
            if(!selectedChatCompare || selectedChatCompare._id !== newMessageReceived.chat._id){
                if(!notification.includes(newMessageReceived)){
                    setNotification([newMessageReceived, ...notification]);
                    setFetchAgain(!fetchAgain);
                }

            }else{
                setMessage([...message, newMessageReceived]);
            }
        })
    }, [message])
    


    return (
        <>
            {selectedChat ? (
                <>
                    <Text
                    fontSize={{base: "28px", md: "30px"}}
                    pb={"3"}
                    px={"2"}
                    w={"100%"}
                    fontFamily={"Work sans"}
                    display={"flex"}
                    justifyContent={{ base: "space-between"}}
                    alignItems={"center"}
                    >
                        <IconButton
                        display={{ base: "flex", md: "none"}}
                        icon={<ArrowBackIcon/>}
                        onClick={() => setSelectedChat("")}
                        />
                        {!selectedChat.isGroupChat ? (
                            <>
                            {getSender(user, selectedChat.users)}
                            <ProfileModal user={getSenderFull(user, selectedChat.users)}/>
                            </>
                        ):
                        (
                            <>
                            {selectedChat.chatName.toUpperCase()}
                            <UpdateGroupChatmodal
                            fetchAgain={fetchAgain}
                            setfetchAgain={setFetchAgain}
                            fetchMessages={fetchMessages}
                            />
                            </>
                        )}
                    </Text>
                        <Box
                        display={"flex"}
                        flexDir={"column"}
                        justifyContent={"flex-end"}
                        p={"3"}
                        bg={"#E8E8E8"}
                        w={"100%"}
                        h={"100%"}
                        borderRadius={"lg"}
                        overflowY={"hidden"}>
                            {
                                loading ? (
                                    <Spinner 
                                    size={"xl"}
                                    w={20}
                                    h={20}
                                    alignSelf={"center"}
                                    margin={"auto"}/>
                                ):
                                 (
                                    <div className='messages'>
                                        <ChatWindow message={message} />
                                    </div>
                                 )
                            }
                            <FormControl
                            onKeyDown={ sendMessage } isRequired mt={"3"}>
                            
                                {isTyping?  <div>typing..</div>: <></>}
                                <Input 
                                variant={"filled"}
                                bg={"#E0E0E0"}
                                placeholder='Enter a message..'
                                value={newMessage}
                                onChange={typingHandler}/>
                            </FormControl>
                            
                        </Box>

                </>
            )
                :
                (

                    <Box
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"center"}
                        h={"100%"}
                    >
                        <Text fontSize={"3xl"} pb={"3"} fontFamily={"Work sans"} textColor={"gray"}>
                            Click on a user to start chatting
                        </Text>
                    </Box>
                )}
        </>
    )
}

export default SingleChat
