import { Request, Response } from "express"

export const getBookings = (req: Request, res: Response) => {
	res.send("Bookings fetched")
}

export const getBooking = (req: Request, res: Response) => {
   const { id } = req.params;
   res.send(`Booking ${id} fetched`);
};

export const postBookings = (req: Request, res: Response) => {
   const {data} = req.body
	console.log(data)
	res.send("Booking posted")
};

export const putBooking = (req: Request, res: Response) => {
   const {id} = req.params
	const { data } = req.body;
   console.log(data);
   res.send(`Booking ${id} updated`);
};

export const deleteBooking = (req: Request, res: Response) => {
   const { id } = req.params;
   res.send(`Booking ${id} deleted`);
};