import { Request, Response } from "express";
// import { dbQuery } from "../mongoConnection";

export const getBookings = async (req: Request, res: Response) => {
   return res.json({ 
		bookings: "Booking list" 
	});
};

export const getBooking = async (req: Request, res: Response) => {
   const { id } = req.params;
   return res.json({ 
		booking: "Booking" 
	});
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
