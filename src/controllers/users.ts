import { Request, Response } from "express"
import users from '../../db/users.json'

export const getUsers = (req: Request, res: Response) => {
	res.json(users)
}

export const getUser = (req: Request, res: Response) => {
   const { id } = req.params;
   res.send(`User ${id} fetched`);
};

export const postUsers = (req: Request, res: Response) => {
   const {data} = req.body
	console.log(data)
	res.send("User posted")
};

export const putUser = (req: Request, res: Response) => {
   const {id} = req.params
	const { data } = req.body;
   console.log(data);
   res.send(`User ${id} updated`);
};

export const deleteUser = (req: Request, res: Response) => {
   const { id } = req.params;
   res.send(`User ${id} deleted`);
};