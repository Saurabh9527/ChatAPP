import React, { useState } from 'react'

import {  VStack , FormControl, FormLabel ,Input, InputGroup, InputRightElement, Button } from '@chakra-ui/react'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [show, setShow] = useState(false);

    const handleClick = () => {
        setShow(!show);
    }


    const hanldeSubmit = () => {

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
                }}>
                Guest user login
            </Button>

        </VStack>
    )
}

export default Login
