import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
   photo: String,
   guest_name: String,
   order_date: Date,
   check_in: Date,
   check_out: Date,
   request: String,
   room_type: String,
   status: String,
   price: Number,
   amenities: String,
   room_desc: String,
}) 

export const Booking = mongoose.model('Booking', bookingSchema);