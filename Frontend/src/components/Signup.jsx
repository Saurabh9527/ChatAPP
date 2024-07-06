
import React, { useState } from 'react'
import {  VStack , FormControl, FormLabel ,Input, InputGroup, InputRightElement, Button } from '@chakra-ui/react'

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [avatar, setAvtaar] = useState('');
    const [show, setShow] = useState(false);

    const handleClick = () =>{
        setShow(!show);
    }
    const postDetails = (pics)=>{

    }

    const hanldeSubmit = () =>{

    }

  return (
<VStack spacing={"5px"} color={'black'}>
    <FormControl id='first-name' isRequired>
        <FormLabel>Name</FormLabel>
            <Input 
            type="text"
            placeholder='Enter your name' 
            onChange={(e)=>{setName(e.target.value)}}
            />  
    </FormControl>

    <FormControl id='signup-email' isRequired>
        <FormLabel>email</FormLabel>
            <Input 
            type="Email"
            placeholder='Enter your email' 
            onChange={(e)=>{setEmail(e.target.value)}}
            />  
    </FormControl>

    <FormControl id='signup-password' isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
        <Input 
            type= {show ? "text" : "password"}
            placeholder='Enter your password' 
            onChange={(e)=>{setPassword(e.target.value)}}
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
            type= {show ? "text" : "password"}
            placeholder='Re-enter password' 
            onChange={(e)=>{setConfirmPassword(e.target.value)}}
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
        onChange={(e)=>{postDetails(e.target.files[0])}}/>
    </FormControl>

    <Button 
    width={'100%'}
    colorScheme='blue'
    onClick={hanldeSubmit}>
        Sign Up
    </Button>

</VStack>
  )
}

export default Signup
