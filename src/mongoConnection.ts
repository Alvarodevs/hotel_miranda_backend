import * as dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';

mongoose.set("strictQuery", false);

export async function connection(): Promise<void> {
	try {
		await mongoose.connect("mongodb://127.0.0.1:27017/hotel_miranda");
	} catch (error){
		console.error(error);
	}
}

export async function disconnect (): Promise<void> {
	await mongoose.disconnect();
}