import { NextFunction, Request, Response } from "express";
import { connection, disconnect } from "../mongoConnection";
import { IBooking, IRoom, IUser, IContact } from "../interfaces";
import { Booking } from "../schemas";
import { nextTick } from "process";

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

export const putBooking = (req: Request, res: Response) => {
   const { id } = req.params;
   const { booking } = req.body;
   return res.json({
      info: "Booking updated",
      // booking: booking,
   });
};

export const deleteBooking = (req: Request, res: Response) => {
   const { id } = req.params;
   return res.json({
      info: "Booking deleted",
   });
};
