import mysql from 'mysql'

const connection = mysql.createConnection({
	host: 'localhost:',
	database: 'hotel_miranda',
	user: 'root',
	password: ''
})

connection.connect((error) => {
	try{
		console.log('MySQL connection succeded')
	} catch{
		throw error
	}
})

export default connection
