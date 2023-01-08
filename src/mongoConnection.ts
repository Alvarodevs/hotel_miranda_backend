import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();

mongoose.set('strictQuery', true);

const uri = process.env.URI_DB || 'mongodb://127.0.0.1:27017/hotel_miranda'

export async function connection(): Promise<void> {
	await mongoose.connect(uri);
	mongoose.connection.on('error', (error) => {
		console.error(error)
	})
}

export async function disconnect (): Promise<void> {
	await mongoose.disconnect();
}