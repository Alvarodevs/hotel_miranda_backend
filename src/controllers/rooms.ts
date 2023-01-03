import { Request, Response } from "express"

export const getRooms = async (req: Request, res: Response) => {
	return res.json({rooms: "Rooms"})
}

export const getRoom = async (req: Request, res: Response) => {
	const {id} = req.params
   return res.json({ room: "Room" });
};

export const postRooms = (req: Request, res: Response) => {
   const {room} = req.body
	return res.json({
      info: "Room posted",
		room: room
   });
};

export const putRoom = (req: Request, res: Response) => {
   const {id} = req.params
	const { room } = req.body;
   return res.json({
		info: "Room updated",
		room: room
	})
};

export const deleteRoom = (req: Request, res: Response) => {
   const { id } = req.params;
	return res.json({
		info: "Room deleted"
	})
};