import express, { Response, Request, NextFunction } from "express";
import bookingsRouter from "./routes/bookings";
import roomsRouter from "./routes/rooms";
import usersRouter from "./routes/users";
import contactsRouter from "./routes/contacts";
import loginRouter from "./routes/login";
import passport from "passport";
import("./auth/auth");

const app = express();

app.use(express.json());
const PORT = 3306;
app.get("/", (req: Request, res: Response) => {
   res.send("hello");
});

app.use("/login", loginRouter);

app.use(
   "/bookings",
   passport.authenticate("jwt", { session: false }),
   bookingsRouter
);
app.use(
   "/rooms",
   passport.authenticate("jwt", { session: false }),
   roomsRouter
);
app.use(
   "/users",
   passport.authenticate("jwt", { session: false }),
   usersRouter
);
app.use(
   "/contacts",
   passport.authenticate("jwt", { session: false }),
   contactsRouter
);

app.listen(PORT, () => {
   console.log(`Server running on port: ${PORT}`);
});

//incluir el error handler
app.use(function (err: Error, req: Request, res: Response, next: NextFunction) {
   res.json(err.message);
});
