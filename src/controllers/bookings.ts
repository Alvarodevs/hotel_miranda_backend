import { NextFunction, Request, Response } from "express";
import { disconnect } from "../mongoConnection";
import { IBooking} from "../interfaces";
import { Booking } from "../schemas";

export const getBookings = async (req: Request, res: Response) => {
	const bookings: IBooking[] = await Booking.find();
	res.status(200).json(bookings);
	await disconnect()
};

export const getBooking = async (req: Request, res: Response) => {
   const { id } = req.params;
	const booking: IBooking | null = await Booking.findById(id)
   res.json(booking);
	await disconnect();
};

export const postBookings = async (req: Request, res: Response, next: NextFunction) => {
   const booking = new Booking(req.body.booking);
   try {
		const postedBooking = await booking.save();
		res.status(201).json({postedBooking})
	} catch (error) {
		res.status(400).send({
         message: "Something went wrong, check booking details.",
      });
	}
	await disconnect();
};

export const putBooking = async (req: Request, res: Response, next: NextFunction) => {
   try {
		const { id } = req.params;
      const booking: IBooking = req.body.booking;
      const bookingUpToDate = await Booking.findOneAndUpdate({ _id: id },booking);
      res.json({
         message: "Booking has been updated",
         booking: bookingUpToDate,
      });
   } catch (error) {
      res.status(400).json({
         message: "Something went wrong, booking could not be updated.",
      });
   }
	await disconnect();
};

export const deleteBooking = async (req: Request, res: Response, next: NextFunction) => {
   try {
		const { id } = req.params;
      const bookingToDelete = await Booking.findOneAndDelete({ '_id': id });
      res.status(202).json({
         message: `Booking with id ${id} has been deleted`,
      });
   } catch (error) {
      res.status(400).json({
         message: "Something went wrong, booking still persists. Try again.",
      });
   }
   await disconnect();
};
