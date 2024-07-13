import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/userModel.js";

dotenv.config();

export const jwtAuthMiddleware = asyncHandler(async (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    res.status(401);
    throw new Error("Token not found");
  }

  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    res.status(401);
    throw new Error("Unauthorized");
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user details excluding the password
    const user = await User.findById(decode.id).select("-password");
    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401);
    throw new Error("Invalid Token");
  }
});
