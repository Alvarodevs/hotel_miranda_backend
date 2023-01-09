import mongoose from "mongoose";
import {IContact} from '../interfaces'

const contactSchema = new mongoose.Schema<IContact>({
   date: Date,
   customer: String,
   email: String,
   phone: String,
   subject: String,
   comment: String,
   archived: Boolean,
}); 

export const Contact = mongoose.model('Contact', contactSchema);