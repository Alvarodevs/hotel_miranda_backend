import express, {Response, Request} from 'express'
import bookingsRouter from "./routes/bookings";

const app = express()

app.use(express.json())
const PORT = 3001

app.get('/', (req: Request, res: Response) => {
	res.send('hello')
})

app.use(bookingsRouter);

app.listen(PORT, () => {
	console.log(`Server running on port: ${PORT}`)
})