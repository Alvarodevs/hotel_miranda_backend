import { Request, Response } from "express"

export const getContacts = (req: Request, res: Response) => {
	res.send("Contacts fetched")
}

export const getContact = (req: Request, res: Response) => {
   const { id } = req.params;
   res.send(`Contact ${id} fetched`);
};

export const postContacts = (req: Request, res: Response) => {
   const {data} = req.body
	console.log(data)
	res.send("Contact posted")
};

export const putContact = (req: Request, res: Response) => {
   const {id} = req.params
	const { data } = req.body;
   console.log(data);
   res.send(`Contact ${id} updated`);
};

export const deleteContact = (req: Request, res: Response) => {
   const { id } = req.params;
   res.send(`Contact ${id} deleted`);
};