import * as dotenv from 'dotenv';
dotenv.config();
import mysql from 'mysql';

export const connection = mysql.createConnection({
   host: process.env.HOST,
   database: process.env.NAME,
   user: process.env.USER,
   password: process.env.PASSWORD
});

connection.connect()

export function dbQuery(query: string, params: object | null) {
	return new Promise((resolve, reject) => {
		connection.query(query, params, (error, results) => {
			if (error)
				reject(error)
			resolve(results)
		})
	})
}



