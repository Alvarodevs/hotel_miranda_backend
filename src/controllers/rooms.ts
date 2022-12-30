import { Request, Response } from "express"
import { dbQuery } from "../databaseConnection";

export const getRooms = async (req: Request, res: Response) => {
	const results = await dbQuery('SELECT * FROM rooms', null)
	return res.json({rooms: results})
}

export const getRoom = async (req: Request, res: Response) => {
	const {id} = req.params
	const result = await dbQuery(`SELECT * FROM rooms WHERE id = ${id}`, null);
   return res.json({ room: result });
};

export const postRooms = (req: Request, res: Response) => {
   const {room} = req.body
	dbQuery(`INSERT INTO rooms SET ?`, room);
	return res.json({
      info: "Room posted",
		room: room
   });
};

export const putRoom = (req: Request, res: Response) => {
   const {id} = req.params
	const { room } = req.body;
   dbQuery(`UPDATE rooms SET ? WHERE id = ${id}`, room)
   return res.json({
		info: "Room updated",
		room: room
	})
};

export const deleteRoom = (req: Request, res: Response) => {
   const { id } = req.params;
   dbQuery(`DELETE FROM rooms WHERE id = ${id}`, null);
	return res.json({
		info: "Room deleted"
	})
};