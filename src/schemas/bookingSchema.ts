import mongoose, { Types } from "mongoose";
import { IBooking } from "../interfaces";

const bookingSchema = new mongoose.Schema<IBooking>({
   user_id: { type: Types.ObjectId, required: true },
   room_id: { type: Types.ObjectId, required: true },
   photo: { type: String, required: true },
   guest_name: { type: String, required: true },
   order_date: { type: Date, required: true },
   check_in: { type: Date, required: true },
   check_out: { type: Date, required: true },
   request: String,
   room_type: { type: String, required: true },
   status: { type: String, required: true },
   price: { type: Number, required: true },
   amenities: String,
   room_desc: String,
}); 

export const Booking = mongoose.model('Booking', bookingSchema);