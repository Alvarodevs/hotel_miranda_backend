import { Types } from "mongoose";

export interface IUser {
   _id?: typeof Types.ObjectId;
   image: string;
   name: string;
   email: string;
   password: string | Promise<string> | undefined;
   phone: string;
   date: Date | string;
   job_desc: string;
   state: boolean;
}
