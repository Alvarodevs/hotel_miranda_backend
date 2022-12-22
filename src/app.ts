import express, {Response, Request} from 'express'
import bookingsRouter from "./routes/bookings";
import roomsRouter from './routes/rooms';
import usersRouter from './routes/users';
import contactsRouter from './routes/contacts';

const app = express()

app.use(express.json())
const PORT = 3001

app.get('/', (req: Request, res: Response) => {
	res.send('hello')
})

app.use(bookingsRouter);
app.use(roomsRouter);
app.use(usersRouter)
app.use(contactsRouter)

app.listen(PORT, () => {
	console.log(`Server running on port: ${PORT}`)
})