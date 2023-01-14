import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();

mongoose.set('strictQuery', true);

const atlas = process.env.ATLAS_URL
const uri = process.env.URI_DB

export async function connection(): Promise<void> {
	await mongoose.connect(atlas || uri);
	mongoose.connection.on('error', (error) => {
		console.error(error)
	})
}

export async function disconnect (): Promise<void> {
	await mongoose.disconnect();
}