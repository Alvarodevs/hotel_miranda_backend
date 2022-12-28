import * as dotenv from 'dotenv';
dotenv.config({path: '../.env'});
import mysql from 'mysql';

const connection = mysql.createConnection({
   host: process.env.HOST,
   database: process.env.NAME,
   user: process.env.USER,
   password: process.env.PASSWORD
});

connection.connect()

function dbQuery(query: string, params: object) {
	return new Promise((resolve, reject) => {
		connection.query(query, params, (error, results) => {
			if (error)
				reject(error)
			resolve(results)
		})
	})
}

export default dbQuery
