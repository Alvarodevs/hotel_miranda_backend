import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
   date: Date,
   customer: String,
   email: String,
   phone: String,
   subject: String,
   comment: String,
   archived: Boolean,
}) 

export const Contact = mongoose.model('Contact', contactSchema);