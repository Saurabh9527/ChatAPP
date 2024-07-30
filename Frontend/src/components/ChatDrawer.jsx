
import { Avatar, Box, Button, Menu, MenuButton, Text, Tooltip, MenuList, MenuItem, MenuDivider, Drawer, DrawerContent, DrawerHeader, DrawerOverlay, DrawerBody, Input, useToast, Spinner } from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { ChatContext } from '../Context/ChatProvider';
import ProfileModal from './ProfileModal';
import { useNavigate } from 'react-router-dom';
import { useDisclosure } from '@chakra-ui/hooks';
import axios from 'axios';
import { BACKEND_URL } from '../utils/constant';
import ChatLoading from './ChatLoading';
import UserListItem from './UserSearch/UserListItem';

const ChatDrawer = () => {

  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false)
  const { user, setSelectedChat, chats, setChats } = useContext(ChatContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  //console.log(user);
  const navigate = useNavigate();
  const toast = useToast();

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  }

  const handleSearch = async () => {
    
    if(!search){
      toast({
        title: 'Please enter something in search',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'top-left'
      })
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
          setLoading(false);
          setSearchResult(data);
          
    } catch (error) {
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

  const accessChat = async ( userId ) => {

    try {
        setLoadingChat(true);
        const res = await axios.post(`${BACKEND_URL}/api/chat`, {userId},
          {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.token}`,
            },
          });
          const { data } = res;
          console.log(res); 
          if(!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);

          setSelectedChat(data)
          setLoadingChat(false);
          onClose();
    } catch (error) {
      toast({
        title: 'Error fetching the chat',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom-left'
      })
    }
  }

  return (
    <>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        bg={"white"}
        w={"100%"}
        p={"5px 10px 5px 10px"}
        borderWidth={"3px"}
      >
        <Tooltip
          label="Search user to chat"
          hasArrow
          placement='bottom-end'
        >
          <Button variant={'ghost'} borderWidth={"1px"} onClick={onOpen}>
            <FaSearch />
            <Text display={{ base: "none", md: "flex" }} px={"4"}>
              Search User
            </Text>
          </Button>
        </Tooltip>

        <Text fontSize={"2xl"} fontFamily={"Work sans"}>
          Chat-Connect
        </Text>

        <div>
          <Menu>
            <MenuButton p={"1"}>
              <BellIcon fontSize={"2xl"} m={"1"} />
            </MenuButton>
          </Menu>

          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              <Avatar
                size={"sm"}
                cursor={"pointer"}
                name={user.name}
                src={user.avatar}
              />
            </MenuButton>
            <MenuList>
              <ProfileModal user={user}>
                <MenuItem>My Profile</MenuItem>
              </ProfileModal>
              <MenuDivider />
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </MenuList>
          </Menu>

        </div>
      </Box>

      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
        <DrawerHeader>
          Search users
        </DrawerHeader>
        <DrawerBody>
          <Box display={"flex"} pb={"2"}>
            <Input
            placeholder='Search by name or email'
            mr={'2'}
            value={search}
            onChange={(e)=> setSearch(e.target.value)}/>
            <Button onClick={handleSearch}>Go</Button>
          </Box>

          { loading  ? (
            <ChatLoading />
          ): (
            searchResult?.map(( user ) => (
              <UserListItem
              key={user._id}
              user={user}
              handleFunction= {()=>accessChat(user._id)}
              />
            ))
          )}
          { loadingChat && <Spinner ml={"auto"} display={"flex"}/>}
        </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default ChatDrawer
