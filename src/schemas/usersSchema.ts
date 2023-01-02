import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
   image: String,
   name: String,
   email: String,
   password: String,
   phone: String,
   date: Date,
   job_desc: String,
   state: Boolean,
}) 

export const User = mongoose.model('User', userSchema);