import asyncHandler from "express-async-handler";
import User from '../models/userModel.js';
import generateToken from '../db/generateToken.js'
export const registerUser=asyncHandler(async(req,res)=>{
    const {username,password,userType}=req.body;
    if(!username || !password || !userType){
        res.status(200);
        throw new Error('Please Enter All The Fields');
    }
    const userExist=await User.findOne({username,userType});
    if(userExist){
        res.status(400);
        throw new Error('User Already Exists');
    }
    const user=await User.create({
        username,
        password,
        userType,
    });
    if(user){
        res.status(201).json({
            _id:user._id,
            username:user.username,
            userType:user.userType,
            token:generateToken(user._id),
        })
    }
    else{
        res.status(400);
        throw new Error('Failed to Create a User');
    }
});

export const authUser=asyncHandler(async(req,res)=>{
    const {username,password,userType}=req.body;
    const user=await User.findOne({username,userType});
    if(user && await user.matchPassword(password)){
        res.json({
            _id:user._id,
            username:user.username,
            userType:user.userType,
            token:generateToken(user._id),
        })
    }
    else{
        res.status(401);
        throw new Error("Invalid username or password");
    }
});