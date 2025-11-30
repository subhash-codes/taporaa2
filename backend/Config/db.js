import mongoose from "mongoose";

export const connectDB = async ()=>{
    await mongoose.connect('mongodb+srv://shubhstack:9011128551@cluster0.8ioyoyo.mongodb.net/taporaDB').then(()=>console.log("DB Connected"));
}