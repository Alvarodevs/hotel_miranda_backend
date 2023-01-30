import express, {Response, Request, NextFunction} from 'express'
import bookingsRouter from "./routes/bookings";
import roomsRouter from './routes/rooms';
import usersRouter from './routes/users';
import contactsRouter from './routes/contacts';
import loginRouter from './routes/login';
import passport from 'passport';
import cors from 'cors';
import { connection } from './mongoConnection';
import ("./auth/auth")

const app = express()
app.use(cors());

app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.get('/', (req: Request, res: Response) => {
	res.send('hello')
})

//Established connection to db
connection()

app.use('/login', loginRouter)

app.use("/bookings", passport.authenticate("jwt", { session: false }), bookingsRouter);
app.use("/rooms", passport.authenticate("jwt", { session: false }), roomsRouter);
app.use("/users", passport.authenticate("jwt", { session: false }), usersRouter);
app.use("/contacts", passport.authenticate("jwt", { session: false }), contactsRouter);

app.listen(process.env.PORT, () => {
	console.log(`Server running on port: ${process.env.PORT}`);
})

//error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	res.status(404).send({error: err.message})
	res.status(500).send({error: err.message})
})

export default app;