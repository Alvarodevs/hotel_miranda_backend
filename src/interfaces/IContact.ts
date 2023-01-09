import { Types } from "mongoose";

export interface IContact {
   _id?: typeof Types.ObjectId;
   date: Date | string;
   customer: string;
   email: string;
   phone: string;
   subject: string;
   comment: string;
   archived: boolean;
}
