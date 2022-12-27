import { Request, Response } from "express"
import rooms from "../../db/rooms.json";

export const getRooms = (req: Request, res: Response) => {
	res.json(rooms)
}

export const getRoom = (req: Request, res: Response) => {
	const {id} = req.params
   res.send(`Room ${id} fetched`);
};

export const postRooms = (req: Request, res: Response) => {
   const {data} = req.body
	console.log(data)
	res.send("Room posted")
};

export const putRoom = (req: Request, res: Response) => {
   const {id} = req.params
	const { data } = req.body;
   console.log(data);
   res.send(`Room ${id} updated`);
};

export const deleteRoom = (req: Request, res: Response) => {
   const { id } = req.params;
   res.send(`Room ${id} deleted`);
};