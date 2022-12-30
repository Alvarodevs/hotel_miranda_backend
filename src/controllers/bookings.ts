import { Request, Response } from "express";
import { dbQuery } from "../databaseConnection";

export const getBookings = async (req: Request, res: Response) => {
   const results = await dbQuery("SELECT * FROM bookings", null);
   return res.json({ bookings: results });
};

export const getBooking = async (req: Request, res: Response) => {
   const { id } = req.params;
   const result = await dbQuery(`SELECT * FROM bookings WHERE id = ${id}`, null);
   return res.json({ booking: result });
};

export const postBookings = (req: Request, res: Response) => {
   const { booking } = req.body;
   dbQuery(`INSERT INTO bookings SET ?`, booking);
   return res.json({
      info: "Booking posted",
      booking: booking,
   });
};

export const putBooking = (req: Request, res: Response) => {
   const { id } = req.params;
   const { booking } = req.body;
   dbQuery(`UPDATE bookings SET ? WHERE id = ${id}`, booking);
   return res.json({
      info: "Booking updated",
      booking: booking,
   });
};

export const deleteBooking = (req: Request, res: Response) => {
   const { id } = req.params;
   dbQuery(`DELETE FROM bookings WHERE id = ${id}`, null);
   return res.json({
      info: "Booking deleted",
   });
};
