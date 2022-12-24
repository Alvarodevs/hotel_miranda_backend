import express from "express";
import { deleteBooking, getBookings, getBooking, postBookings, putBooking } from "../controllers/bookings";
const bookingsRouter = express.Router();

//Booking routes//
bookingsRouter.get("/", getBookings);

bookingsRouter.get("/:id", getBooking);

bookingsRouter.post("/", postBookings);

bookingsRouter.put("/:id", putBooking);

bookingsRouter.delete("/:id", deleteBooking);

export default bookingsRouter;
