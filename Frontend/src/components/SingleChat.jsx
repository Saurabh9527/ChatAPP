
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
var socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {

    const { user, selectedChat, setSelectedChat } = useContext(ChatContext);
    const [message, setMessage] = useState([]);    
    const [loading, setLoading] = useState(false);    
    const [newMessage, setNewMessage] = useState('');  
    const [socketConnected, setSocketConnected] = useState(false);  
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
    }

    useEffect(() => {
        socket = io(BACKEND_URL);
        socket.emit("setup", user);
        socket.on("connected", () =>(
            setSocketConnected(true)
        ));
    }, []);

    useEffect( () => {
       // console.log("FEtch Message");
        
        fetchMessages();
        selectedChatCompare = selectedChat;
    }, [selectedChat])



    useEffect(() => {
         socket.on("message received", (newMessageReceived) => {
            //console.log(newMessageReceived);
            
            if(!selectedChatCompare || selectedChatCompare._id !== newMessageReceived._id){
                //New Notification logic
            }else{
                setMessage([...message, newMessageReceived]);
            }
        })
    })
    


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
