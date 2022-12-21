import express from "express"
import { deleteBooking, getBookings, postBookings, putBooking } from "../controllers/bookings"
const bookingsRouter = express.Router()


//Booking routes//
bookingsRouter.get('/bookings', getBookings)

bookingsRouter.post("/bookings", postBookings);

bookingsRouter.put("/booking/:id", putBooking);

bookingsRouter.delete("/booking/:id", deleteBooking);

export default bookingsRouter