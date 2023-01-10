import { NextFunction, Request, Response } from "express";
import { disconnect } from "../mongoConnection";
import { IUser } from "../interfaces";
import { User } from "../schemas";
import bcrypt from 'bcrypt';
import passCrypt from "../utils/passCrypt";

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
      res.status(400).json({
         message: "Something went wrong, check user details.",
      });
   }
   await disconnect();
};

//Hacer findOne con id, y comprobar si passw en db === passw en body
export const putUser = async (req: Request, res: Response, next: NextFunction) => { 
   try {
		const { id } = req.params;
		const {image, name, email, password, phone, date, job_desc, state} = req.body.user
		const userDb = await User.findById(id)
      const user: IUser = {
         image: image ? image : userDb?.image,
         name: name ? name : userDb?.name,
         email: email ? email : userDb?.email,
         password: bcrypt.compare(password, String(userDb?.password)) ? await passCrypt(password) : userDb?.password,
         phone: phone ? phone : userDb?.phone,
         date: date ? date : userDb?.date,
         job_desc: job_desc ? job_desc : userDb?.job_desc,
         state: state ? state : userDb?.state,
      };
      const userUpToDate = await User.findOneAndUpdate({ _id: id }, user);
      res.json({
         message: "User has been updated",
         user: userUpToDate,
      });
   } catch (error) {
      res.status(400).json({
         message: "Something went wrong, user could not be updated.",
      });
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
      res.status(400).json({
         message: "Something went wrong, user still persists. Try again.",
      });
   }
   return await disconnect();
};
