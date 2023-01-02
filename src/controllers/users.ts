import { Request, Response } from "express";
import { dbQuery } from "../mongoConnection";

export const getUsers = async (req: Request, res: Response) => {
   const results = await dbQuery("SELECT * FROM users", null);
   return res.json({ users: results });
};

export const getUser = async (req: Request, res: Response) => {
   const { id } = req.params;
   const result = await dbQuery(
      `SELECT * FROM users WHERE id = ${id}`,
      null
   );
   return res.json({ user: result });
};

export const postUsers = (req: Request, res: Response) => {
   const { user } = req.body;
   dbQuery(`INSERT INTO users SET ?`, user);
   return res.json({
      info: "User posted",
      user: user,
   });
};

export const putUser = (req: Request, res: Response) => {
   const { id } = req.params;
   const { user } = req.body;
   dbQuery(`UPDATE users SET ? WHERE id = ${id}`, user);
   return res.json({
      info: "User updated",
      user: user,
   });
};

export const deleteUser = (req: Request, res: Response) => {
   const { id } = req.params;
   dbQuery(`DELETE FROM users WHERE id = ${id}`, null);
   return res.json({
      info: "User deleted",
   });
};