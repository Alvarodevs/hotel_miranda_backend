import { NextFunction, Request, Response } from "express";
import { connection, disconnect } from "../mongoConnection";
import { IBooking} from "../interfaces";
import { Booking } from "../schemas";
import { Types } from "mongoose";

export const getBookings = async (req: Request, res: Response) => {
	await connection(); 
	const bookings: IBooking[] = await Booking.find();
	res.json(bookings);
	await disconnect()
};

export const getBooking = async (req: Request, res: Response) => {
	await connection()
   const { id } = req.params;
	const booking: IBooking | null = await Booking.findById(id)
   res.json(booking);
	await disconnect();
};

export const postBookings = async (req: Request, res: Response, next: NextFunction) => {
	await connection();
   const booking = new Booking(req.body.booking);
   try {
		const postedBooking = await booking.save();
		res.status(201).json({postedBooking})
	} catch (error) {
		res.status(400).send({
         message: "Something went wrong, check booking details.",
      });
		next(error)
	}
	await disconnect();
};

export const putBooking = async (req: Request, res: Response, next: NextFunction) => {
   await connection();
	const { id } = req.params;
   const booking: IBooking = req.body.booking;
   try {
      const bookingUpToDate = Booking.findOneAndUpdate(
         { _id: id },
         booking
      );
      res.status(201).json({
         message: "Booking has been updated",
         booking: bookingUpToDate,
      });
   } catch (error) {
      res.status(400).send({
         message: "Something went wrong, booking could not be updated.",
      });
      next(error);
   }
	await disconnect();
};

export const deleteBooking = async (req: Request, res: Response, next: NextFunction) => {
   await connection();
   const { id } = req.params;
   try {
      const bookingToDelete = Booking.findOneAndDelete({ '_id': id });
      res.status(202).json({
         message: `Booking with id ${id} has been deleted`,
      });
   } catch (error) {
      res.status(400).send({
         message: "Something went wrong, booking still persists. Try again.",
      });
      next(error);
   }
   return await disconnect();
};
