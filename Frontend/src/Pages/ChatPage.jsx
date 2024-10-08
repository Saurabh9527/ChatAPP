
import React, { useContext, useEffect, useState } from 'react'
import { ChatContext } from '../Context/ChatProvider'
import ChatDrawer from '../components/ChatDrawer';
import { Box } from '@chakra-ui/react'
import MyChats from '../components/Chats/MyChats';
import ChatBox from '../components/Chats/ChatBox';

const ChatPage = () => {

  const {user} = useContext(ChatContext);
  const [fetchAgain, setFetchAgain] = useState(false);
  
  return (
    <div style={{width: "100%"}}> 
        {user && <ChatDrawer />}

        <Box
        display={'flex'}
        justifyContent={'space-between'}
        width={'100%'}
        height={'91.5vh'}
        padding={'10px'}>
        {user && <MyChats fetchAgain={fetchAgain}/>}
        {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>}
        </Box>
    </div>  
  )
}

export default ChatPage
