import { Request, Response } from "express"
import rooms from "../../db/rooms.json";
import { dbQuery } from "../databaseConnection";

export const getRooms = async (req: Request, res: Response) => {
	const results = await dbQuery('SELECT * FROM rooms', null)
	return res.json({rooms: results})
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