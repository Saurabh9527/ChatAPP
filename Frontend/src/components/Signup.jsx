
import React, { useState , use } from 'react'
import { VStack, FormControl, FormLabel, Input, InputGroup, InputRightElement, Button, useToast } from '@chakra-ui/react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { BACKEND_URL} from '../utils/constant';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [avatar, setAvtaar] = useState('');
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();

    const handleClick = () => {
        setShow(!show);
    }
    const postDetails = async (pics) => {
        setLoading(true);
        if (pics === undefined) {
            toast({
                title: 'Please Select an image',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            })
            setLoading(false);
            return;
        }

        if (pics.type === 'image/jpeg' || pics.type === 'image/png') {
            const data = new FormData();
            data.append('file', pics);
            data.append('upload_preset', 'chat-app');
            data.append('cloud_name', 'dq2fwykh2');

            try {
                const response = await fetch("https://api.cloudinary.com/v1_1/dq2fwykh2/image/upload", {
                    method: 'POST',
                    body: data,
                });
                const result = await response.json();
                setAvtaar(result.url.toString());
                console.log(result.url.toString());
            } catch (error) {
                toast({
                    title: 'Error Occured',
                    description:error.response.data.nessage,
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                    position: 'bottom'
                })
            } finally {
                setLoading(false);
            }
        } else {
            toast({
                title: 'Please Select an image',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            })
            setLoading(false);
            return;
        }
    }

    const hanldeSubmit = async () => {
        setLoading(true);

        if (!name || !email || !password || !confirmPassword) {
            toast({
                title: 'Please fill all details',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            })
            setLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            toast({
                title: 'Password not match',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            })
            setLoading(false);
            return;
        }

        try {
            const res = await axios.post(`${BACKEND_URL}/api/user/signup`, { name, email, password, avatar },
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                    },
                })

                toast({
                    title: 'Registration Success',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                    position: 'bottom'
                })

                localStorage.setItem('userInfo', JSON.stringify(res));
                setLoading(false);
                navigate('/chats');
        } catch (error) {
            console.log(error);
            toast({
                title: 'Error Occured',
                // description:error.response.data.nessage,
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            })
            setLoading(false);
        }
    }

    return (
        <VStack spacing={"5px"} color={'black'}>
            <FormControl id='first-name' isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                    type="text"
                    placeholder='Enter your name'
                    onChange={(e) => { setName(e.target.value) }}
                />
            </FormControl>

            <FormControl id='signup-email' isRequired>
                <FormLabel>email</FormLabel>
                <Input
                    type="Email"
                    placeholder='Enter your email'
                    onChange={(e) => { setEmail(e.target.value) }}
                />
            </FormControl>

            <FormControl id='signup-password' isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input
                        type={show ? "text" : "password"}
                        placeholder='Enter your password'
                        onChange={(e) => { setPassword(e.target.value) }}
                    />
                    <InputRightElement width={"4.5rem"}>
                        <Button size={"sm"} onClick={handleClick}>
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>

            </FormControl>

            <FormControl id='signup-confirmpassword' isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup>
                    <Input
                        type={show ? "text" : "password"}
                        placeholder='Re-enter password'
                        onChange={(e) => { setConfirmPassword(e.target.value) }}
                    />
                    <InputRightElement width={"4.5rem"}>
                        <Button size={"sm"} onClick={handleClick}>
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>

            <FormControl id='avtaar' isRequired>
                <FormLabel>Profile Image</FormLabel>
                <Input
                    type='file'
                    p={1.5}
                    accept='image/*'
                    onChange={(e) => { postDetails(e.target.files[0]) }} />
            </FormControl>

            <Button
                width={'100%'}
                colorScheme='blue'
                onClick={hanldeSubmit}
                isLoading={loading}
            >
                Sign Up
            </Button>

        </VStack>
    )
}

export default Signup
