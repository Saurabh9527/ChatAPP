

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name : 
    {
        type: String,
        required: true,
    },
    email : 
    {
        type: String,
        required: true,
    },
    password :  
    {
        type: String,
        required: true,
    },
    pic : 
    {
        type: String,
        required: true,
        default: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png',
    },

  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);
