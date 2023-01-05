import { NextFunction, Request, Response } from "express";
import { connection, disconnect } from "../mongoConnection";
import { IRoom } from "../interfaces";
import { Room } from "../schemas";
import { Types } from "mongoose";

export const getRooms = async (req: Request, res: Response) => {
   await connection();
   const rooms: IRoom[] = await Room.find();
   res.json(rooms);
   await disconnect();
};

export const getRoom = async (req: Request, res: Response) => {
   await connection();
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
   await connection();
   const room = new Room(req.body.room);
   try {
      const postedRoom = await room.save();
      res.status(201).json({ postedRoom });
   } catch (error) {
      res.status(400).send({
         message: "Something went wrong, check room details.",
      });
      next(error);
   }
   await disconnect();
};

export const putRoom = async (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   await connection();
   const { id } = req.params;
   const room: IRoom = req.body.room;
   try {
      const roomUpToDate = Room.findOneAndUpdate({ _id: id }, room);
      res.status(201).json({
         message: "Room has been updated",
         room: roomUpToDate,
      });
   } catch (error) {
      res.status(400).send({
         message: "Something went wrong, room could not be updated.",
      });
      next(error);
   }
   await disconnect();
};

export const deleteRoom = async (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   await connection();
   const { id } = req.params;
   try {
      const roomToDelete = Room.findOneAndDelete({ _id: id });
      res.status(202).json({
         message: `Room with id ${id} has been deleted`,
      });
   } catch (error) {
      res.status(400).send({
         message: "Something went wrong, room still persists. Try again.",
      });
      next(error);
   }
   return await disconnect();
};
