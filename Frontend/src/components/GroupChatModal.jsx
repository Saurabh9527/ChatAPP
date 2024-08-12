import { useDisclosure } from '@chakra-ui/hooks'
import { Button, Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useToast,
    FormControl,
    Input,
    Box,} from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import { ChatContext } from '../Context/ChatProvider'
import axios from 'axios'
import { BACKEND_URL } from '../utils/constant'
import UserListItem from './UserSearch/UserListItem'
import UserBadgeItem from './UserSearch/UserBadgeItem'

const GroupChatModal = ( {children} ) => {

    const { isOpen, onOpen, onClose } = useDisclosure() 
    const [ groupChatName, setGroupChatName ] = useState('');
    const [selectedUser , setSelectedUser] = useState([]);
    const [ search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const { user, chats, setChats } = useContext(ChatContext);

    const handleSearch = async ( query ) => {
        
        setSearch(query);
        if(!query){
            return;
        }
 
        try {
            setLoading(true);
            const res = await axios.get(`${BACKEND_URL}/api/user?search=${search}`,
                {
                  withCredentials: true,
                  headers: {
                      "Content-Type": "application/json",
                      "Authorization": `Bearer ${user.token}`,
                  },
                });
                const { data } = res;
                console.log(data);         
                setLoading(false);
                setSearchResult(data);
        } catch (error) {
            console.log(error);
            
            toast({
                title: 'Error Occured!',
                description: "Failed to Load the Search Results",
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'bottom-left'
              })
        }
    }

    const handleSubmit = async () => {
        if(!groupChatName  || !selectedUser ){
            toast({
                title: 'Please fill all the feilds',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'top'
              })
              return;
        }

        try {
            const res = await axios.post(`${BACKEND_URL}/api/chat/group`,
                {
                    name:groupChatName,
                    user: JSON.stringify(selectedUser.map((u) => (u._id)))
                },
                {
                  withCredentials: true,
                  headers: {
                      "Content-Type": "application/json",
                      "Authorization": `Bearer ${user.token}`,
                  },
                });

                const { data } = res; 
                console.log(res);    
                setChats([data, ...chats]);
                onClose()
                toast({
                    title: 'New Group Chat Created',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                    position: 'bottom'
                  })

        } catch (error) {
            toast({
                title: 'failed to create group chat',
                description: error.response.data,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'top'
              })
        }
    }

    const handleGroup = ( userToAdd) => {
        if(selectedUser.includes(userToAdd)){
            toast({
                title: 'User already added!',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'top'
              })
              return;
        }

        setSelectedUser([...selectedUser, userToAdd]);
    }

    const handleDelete = ( delUser ) => {
        setSelectedUser(selectedUser.filter((sel) => (sel._id !==  delUser._id)));
    }
 
    return (
        <>
          <Box onClick={onOpen}>{children}</Box>
    
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader
              fontSize={"35px"}
              fontFamily={"Work sans"}
              display={"flex"}
              justifyContent={"center"}
              >Create Group Chat</ModalHeader>
              <ModalCloseButton />
              <ModalBody display={"flex"} flexDir={"column"} alignItems={"center"}>
                    <FormControl>
                        <Input 
                        placeholder='Chat Name' 
                        mb={"3"}
                        onChange={(e)=> setGroupChatName(e.target.value)}/>
                    </FormControl>
                    <FormControl>
                        <Input 
                        placeholder='Add user eg: Alex, Bob' 
                        mb={"1"}
                        onChange={(e)=> handleSearch(e.target.value)}/>
                    </FormControl>
                    <Box w={"100%"} display={"flex"} flexWrap={"wrap"}>
                    {selectedUser.map((user)=>(
                        <UserBadgeItem
                        key={user._id}
                        user={user}
                        handleFunction={() =>handleDelete(user)}
                        />
                    ))}
                    </Box>
                    {loading 
                    ? (
                    <div>loading...</div>
                    ):
                    (
                        searchResult?.slice(0, 4).map((user)=>(
                            <UserListItem 
                            key={user._id}
                            user={user}
                            handleFunction ={() => handleGroup(user)}/>
                        ))
                    )}
              </ModalBody>

              <ModalFooter>
                <Button 
                colorScheme='blue' 
                mr={3} 
                onClick={handleSubmit}>
                  Create Chat
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )
}

export default GroupChatModal
