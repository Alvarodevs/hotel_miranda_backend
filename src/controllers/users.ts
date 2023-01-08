import { NextFunction, Request, Response } from "express";
import { disconnect } from "../mongoConnection";
import { IUser } from "../interfaces";
import { User } from "../schemas";

export const getUsers = async (req: Request, res: Response) => {
   const users: IUser[] = await User.find();
   res.json(users);
   await disconnect();
};

export const getUser = async (req: Request, res: Response) => {
   const { id } = req.params;
   const user: IUser | null = await User.findById(id);
   res.json(user);
   await disconnect();
};

export const postUsers = async (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   try {
		const user = new User(req.body.user);
      const postedUser = await user.save();
      res.status(201).json({ postedUser });
   } catch (error) {
      res.status(400).send({
         message: "Something went wrong, check user details.",
      });
      next(error);
   }
   await disconnect();
};
//Hacer findOne con id, y comprobar si passw en db === passw en body
export const putUser = async (
   req: Request,
   res: Response,
   next: NextFunction
) => { 
   try {
		const { id } = req.params;
      const user: IUser = req.body.user;
      const userUpToDate = await User.findOneAndUpdate({ _id: id }, user);
      res.status(201).json({
         message: "User has been updated",
         user: userUpToDate,
      });
   } catch (error) {
      res.status(400).send({
         message: "Something went wrong, user could not be updated.",
      });
      next(error);
   }
   await disconnect();
};

export const deleteUser = async (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   try {
		const { id } = req.params;
      const userToDelete = User.findOneAndDelete({ _id: id });
      res.status(202).json({
         message: `User with id ${id} has been deleted`,
      });
   } catch (error) {
      res.status(400).send({
         message: "Something went wrong, user still persists. Try again.",
      });
      next(error);
   }
   return await disconnect();
};
