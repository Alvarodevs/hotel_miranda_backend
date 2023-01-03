import { Request, Response } from "express";

export const getUsers = async (req: Request, res: Response) => {
   return res.json({ users: "Users" });
};

export const getUser = async (req: Request, res: Response) => {
   const { id } = req.params;
   return res.json({ user: "User" });
};

export const postUsers = (req: Request, res: Response) => {
   const { user } = req.body;
   return res.json({
      info: "User posted",
      user: user,
   });
};

export const putUser = (req: Request, res: Response) => {
   const { id } = req.params;
   const { user } = req.body;
   return res.json({
      info: "User updated",
      user: user,
   });
};

export const deleteUser = (req: Request, res: Response) => {
   const { id } = req.params;
   return res.json({
      info: "User deleted",
   });
};