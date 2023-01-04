import { Request, Response } from "express";
import { connection, disconnect } from "../mongoConnection";
import { IBooking, IRoom, IUser, IContact } from "../interfaces";
import { Booking, Room, User, Contact } from "../schemas";

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
   return res.json(booking);
	await disconnect();
};

export const postBookings = (req: Request, res: Response) => {
   const { booking } = req.body;
   return res.json({
      info: "Booking posted",
      // booking: booking,
   });
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
