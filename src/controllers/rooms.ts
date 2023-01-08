import { NextFunction, Request, Response } from "express";
import { disconnect } from "../mongoConnection";
import { IRoom } from "../interfaces";
import { Room } from "../schemas";

export const getRooms = async (req: Request, res: Response) => {
   const rooms: IRoom[] = await Room.find();
   res.json(rooms);
   await disconnect();
};

export const getRoom = async (req: Request, res: Response) => {
   const { id } = req.params;
   const room: IRoom | null = await Room.findById(id);
   res.json(room);
   await disconnect();
};

export const postRooms = async (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   try {
		const room = new Room(req.body.room);
      const postedRoom = await room.save();
      res.status(201).json({ postedRoom });
   } catch (error) {
      res.status(400).send({
         message: "Something went wrong, check room details.",
      });
   }
   await disconnect();
};

export const putRoom = async (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   
   try {
		const { id } = req.params;
      const room: IRoom = req.body.room;
      const roomUpToDate = await Room.findOneAndUpdate({ _id: id }, room);
      res.status(201).json({
         message: "Room has been updated",
         room: roomUpToDate,
      });
   } catch (error) {
      res.status(400).json({
         message: "Something went wrong, room could not be updated.",
      });
   }
   await disconnect();
};

export const deleteRoom = async (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   try {
		const { id } = req.params;
      const roomToDelete = Room.findOneAndDelete({ _id: id });
      res.status(202).json({
         message: `Room with id ${id} has been deleted`,
      });
   } catch (error) {
      res.status(400).json({
         message: "Something went wrong, room still persists. Try again.",
      });
   }
   return await disconnect();
};
