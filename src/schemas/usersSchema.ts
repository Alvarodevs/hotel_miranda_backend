import mongoose from "mongoose";
import { IUser } from "../interfaces";

const userSchema = new mongoose.Schema<IUser>({
   image: String,
   name: String,
   email: String,
   password: String,
   phone: String,
   date: Date,
   job_desc: String,
   state: Boolean,
}); 

export const User = mongoose.model('User', userSchema);