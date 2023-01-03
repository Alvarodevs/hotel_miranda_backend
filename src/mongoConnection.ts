import * as dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';

async function connection() {
	try {
		await mongoose.connect("mongodb://127.0.0.1:27017/hotel_miranda");
	} catch (error){
		console.error(error);
	}
}
// export function dbQuery(query: string, params: object | null) {
// 	return new Promise((resolve, reject) => {
// 		connection.query(query, params, (error, results) => {
// 			if (error)
// 				reject(error)
// 			resolve(results)
// 		})
// 	})
// }



