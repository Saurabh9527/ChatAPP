import jwt from'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();

const generateToken = (userData) => {
    return jwt.sign(userData, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
};

export {generateToken};