
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({
    path: ".env"
})

const mongoURL = process.env.MONGO_URL

mongoose.connect(mongoURL);

const db = mongoose.connection;

db.on('connected' , ()=>{
    console.log("Database connected".cyan.underline);
})

db.on('disconnected' , ()=>{
    console.log("Database disconnected" .red.bold);
})

db.on('error' , (err)=>{
    console.log("MongoDb connection error" , err. red.bold);
})

export default db;