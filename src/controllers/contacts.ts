import { Request, Response } from "express"

export const getContacts = async (req: Request, res: Response) => {
   return res.json({ contacts: "Contacts" });
};

export const getContact = async (req: Request, res: Response) => {
   const { id } = req.params;
   return res.json({ contact: "Contact" });
};

export const postContacts = (req: Request, res: Response) => {
   const { contact } = req.body;
   return res.json({
      info: "Contact posted",
      contact: contact,
   });
};

export const putContact = (req: Request, res: Response) => {
   const { id } = req.params;
   const { contact } = req.body;
   return res.json({
      info: "Contact updated",
      contact: contact,
   });
};

export const deleteContact = (req: Request, res: Response) => {
   const { id } = req.params;
   return res.json({
      info: "Contact deleted",
   });
};