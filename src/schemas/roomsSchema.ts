import mongoose from "mongoose"
import { IRoom } from "../interfaces";

const roomSchema = new mongoose.Schema<IRoom>({
   images: { type: String, required: true },
   bed_type: { type: String, required: true },
   room_number: { type: Number, required: true },
   description: { type: String, required: true },
   price: { type: Number, required: true },
   offer: { type: Boolean, required: true },
   offer_price: { type: Number, required: true },
   cancellation: { type: String, required: true },
   facilities: { type: String, required: true },
   status: { type: Boolean, required: true },
}); 

export const Room = mongoose.model('Room', roomSchema);