import { Types } from "mongoose";

export interface IUserLogin {
	_id?: typeof Types.ObjectId | number,
	email: string,
	name: string,
	password?: string 
}