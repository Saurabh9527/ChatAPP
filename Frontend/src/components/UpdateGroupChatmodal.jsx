
import { useDisclosure } from '@chakra-ui/hooks'
import React, { useContext, useState } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    IconButton,
    Button,
    useToast,
    Box,
    FormControl,
    Input,
    Spinner,
  } from '@chakra-ui/react'
import { ViewIcon } from '@chakra-ui/icons'
import { ChatContext } from '../Context/ChatProvider'
import UserBadgeItem from './UserSearch/UserBadgeItem'
import axios from 'axios'
import { BACKEND_URL } from '../utils/constant'
import UserListItem from './UserSearch/UserListItem'

const UpdateGroupChatmodal = ({ fetchAgain, setfetchAgain , fetchMessages }) => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [groupChatName, setGroupChatName] = useState("");
    const [search, setSearch] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [renameLoading, setRenameLoading] = useState(false);
    const { user, selectedChat, setSelectedChat } = useContext(ChatContext);
    const toast = useToast();

    const handleRemove = async ( user1 ) => {
        console.log(user1);
        
        
        if(selectedChat.groupAdmin._id !== user._id &&  user1._id !== user._id) {
            toast({
                title: 'Only admin can remove someone!',
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'bottom'
              })
              return;
        }

        try {
            setLoading(true);
            const res = await axios.put(`${BACKEND_URL}/api/chat/groupremove`,
                {
                    chatId: selectedChat._id,
                    userId: user1._id,
                },
                {
                  withCredentials: true,
                  headers: {
                      "Content-Type": "application/json",
                      "Authorization": `Bearer ${user.token}`,
                  },
                });
                const { data } = res;
                user1._id === user.id ? setSelectedChat() : setSelectedChat(data);
                setfetchAgain(!fetchAgain)
                fetchMessages(); //after remove user again fetch message
                setLoading(false);
        } catch (error) {
            toast({
                title: 'Error Occured!',
                description: error.response.data.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'bottom'
              });
              setLoading(false)
        }
    }

    const handleAddUser = async ( user1 ) => {
        if(selectedChat.users.find((u) => u.id === user1.id)){
            toast({
                title: 'User already in group',
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'bottom'
              })
              return;
        }

        if(selectedChat.groupAdmin._id !== user1._id){
            toast({
                title: 'Only admin can add someone!',
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'bottom'
              })
              return;
        }

        try {
            setLoading(true);
            const res = await axios.put(`${BACKEND_URL}/api/chat/groupadd`,
                {
                    chatId: selectedChat._id,
                    userId: user1._id,
                },
                {
                  withCredentials: true,
                  headers: {
                      "Content-Type": "application/json",
                      "Authorization": `Bearer ${user.token}`,
                  },
                });
                const { data } = res;
                setSelectedChat(data);
                setfetchAgain(!fetchAgain);
                setLoading(false);
        } catch (error) {
            toast({
                title: 'Error Occured!',
                description: error.response.data.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'bottom'
              });
              setLoading(false)
        }
    }

    const handleRename = async () => {
            if(!groupChatName) return ;
            try {
               setRenameLoading(true);
               const res = await axios.put(`${BACKEND_URL}/api/chat/rename`,
                {
                    chatId: selectedChat._id,
                    chatName: groupChatName,
                },
                {
                  withCredentials: true,
                  headers: {
                      "Content-Type": "application/json",
                      "Authorization": `Bearer ${user.token}`,
                  },
                });
                const { data } = res; 

                setSelectedChat(data);
                setfetchAgain(!fetchAgain)
                setRenameLoading(false);
            } catch (error) {
                toast({
                    title: 'Error Occured!',
                    description: error.response.data.message,
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                    position: 'bottom-left'
                  });
                  setRenameLoading(false)
            }

            setGroupChatName("");
    }

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


    return (
        <>
            <IconButton display={{ base:"flex" }} icon={<ViewIcon />} onClick={onOpen} />
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader
                    fontSize={"35px"}
                    fontFamily={"Work sans"}
                    display={"flex"}
                    justifyContent={"center"}
                    >{selectedChat.chatName}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box w={"100%"} display={"flex"} flexWrap={"wrap"} pb={"3"}>
                            {selectedChat.users.map((user) => (
                                <UserBadgeItem
                                key={user._id}
                                user={user}
                                handleFunction={() =>handleRemove(user)}
                                />
                            ))}
                        </Box>

                        <FormControl display={"flex"}>
                            <Input
                            placeholder='Chat name'
                            mb={"3"}
                            value={groupChatName}
                            onChange={(e) => setGroupChatName(e.target.value)}
                            />
                            <Button
                            variant={"solid"}
                            colorScheme='teal'
                            ml={"1"}
                            isLoading={renameLoading}
                            onClick={handleRename}
                            >
                            update</Button>
                        </FormControl>

                        <FormControl>
                            <Input
                            placeholder='Add user to group'
                            mb={"1"}
                            onChange={(e) => handleSearch(e.target.value)}
                            />
                        </FormControl>
                        {loading ? (
                            <Spinner size={"lg"}/>
                        ): (
                            searchResult?.map((user) => (
                                <UserListItem
                                key={user._id}
                                user={user}
                                handleFunction={() => handleAddUser(user)}
                                />
                            ))
                        )}
                    </ModalBody>

                    <ModalFooter>
                        <Button 
                        onClick={() => handleRemove( user )}
                        colorScheme='red' mr={3}>
                            Leave Group
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default UpdateGroupChatmodal
