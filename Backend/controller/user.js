
import { generateToken } from '../config/jwt.js';
import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';

export const Signup = asyncHandler (async(req, res)=>{
    const {name, email, password, avatar}= req.body;

    if(!name || !email || !password){
        res.status(400);
        throw new Error("Please Enter all the fields");
    }

    const userExist = await User.findOne({email});

    if(userExist){
        res.status(400);
        throw new Error("User already exists");
    }

    const newUser = new User({
        name,
        email,
        password,
        avatar,
    });

    const savedUser = await newUser.save();
    
    const payload = {
        id: savedUser._id,
    }
    const token = generateToken(payload);

    if(savedUser){
        res.status(201).json({
            _id: savedUser._id,
            name: savedUser.name,
            email: savedUser.email,
            avatar: savedUser.avatar,
            token: token,
        });
    }else{
        res.status(400);
        throw new Error("failed to create the User");
    }
});

export const Login = asyncHandler (async(req, res)=>{

    const {email, password}= req.body;
    if( !email || !password){
        res.status(400);
        throw new Error("Please Enter all the fields");
    }
    const user = await User.findOne({email});
    
    if(!user && !(await user.comparePassword(password))){
        res.status(400);
        throw new Error("Invalid email or password");
    }

    const payload = {
        id: user._id,
      };
      const token = generateToken(payload);

      if(user){
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            token: token,
        });
    }else{
        res.status(400);
        throw new Error("failed to create the User");
    }
});