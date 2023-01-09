import { Types } from "mongoose";

export interface IBooking {
   _id?: typeof Types.ObjectId;
   user_id: number | undefined | typeof Types.ObjectId;
   room_id: string | undefined | typeof Types.ObjectId;
   photo: string;
   guest_name: string;
   order_date: Date | string;
   check_in: Date | string;
   check_out: Date | string;
   request?: string;
   room_type: string;
   status: string;
   price: number;
   amenities?: string;
   room_desc?: string;
}
