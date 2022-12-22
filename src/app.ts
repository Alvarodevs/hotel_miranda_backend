import express, {Response, Request} from 'express'
import bookingsRouter from "./routes/bookings";
import roomsRouter from './routes/rooms';
import usersRouter from './routes/users';
import contactsRouter from './routes/contacts';
import loginRouter from './routes/login';
import passport from 'passport';
import ("./auth/auth")

const app = express()

app.use(express.json())
const PORT = 3001

app.get('/', (req: Request, res: Response) => {
	res.send('hello')
})

app.use('/', loginRouter)

app.use("/", passport.authenticate("jwt", { session: false }), bookingsRouter);
app.use("/", passport.authenticate("jwt", { session: false }), roomsRouter);
app.use("/", passport.authenticate("jwt", { session: false }), usersRouter);
app.use("/", passport.authenticate("jwt", { session: false }), contactsRouter);

app.listen(PORT, () => {
	console.log(`Server running on port: ${PORT}`)
})