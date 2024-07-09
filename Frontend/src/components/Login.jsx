import React, { useState } from 'react'
import {  VStack , FormControl, FormLabel ,Input, InputGroup, InputRightElement, Button , useToast } from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { BACKEND_URL } from '../utils/constant';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();

    const handleClick = () => {
        setShow(!show);
    }


    const hanldeSubmit = async () => {
        setLoading(true);

        if ( !email || !password ) {
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

        try {
            const res = await axios.post(`${BACKEND_URL}/api/user/login`, {  email, password},
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                    },
                })

                toast({
                    title: 'Login Success',
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

            <FormControl id='login-email' isRequired>
                <FormLabel>email</FormLabel>
                <Input
                    type="Email"
                    placeholder='Enter your email'
                    value={email}
                    onChange={(e) => { setEmail(e.target.value) }}
                />
            </FormControl>

            <FormControl id='login-password' isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input
                        type={show ? "text" : "password"}
                        value={password}
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

            <Button
                width={'100%'}
                colorScheme='blue'
                onClick={hanldeSubmit}>
                Login
            </Button>

            <Button
                width={'100%'}
                colorScheme='red'
                onClick={()=>{
                    setEmail("guest@gmail.com")
                    setPassword("1234")
                }}
                isLoading={loading}>
                Guest user login
            </Button>

        </VStack>
    )
}

export default Login
