import { Request, Response } from "express"
import { dbQuery } from "../databaseConnection";

export const getContacts = async (req: Request, res: Response) => {
   const results = await dbQuery("SELECT * FROM contacts", null);
   return res.json({ contacts: results });
};

export const getContact = async (req: Request, res: Response) => {
   const { id } = req.params;
   const result = await dbQuery(`SELECT * FROM contacts WHERE id = ${id}`, null);
   return res.json({ contact: result });
};

export const postContacts = (req: Request, res: Response) => {
   const { contact } = req.body;
   dbQuery(`INSERT INTO contacts SET ?`, contact);
   return res.json({
      info: "Contact posted",
      contact: contact,
   });
};

export const putContact = (req: Request, res: Response) => {
   const { id } = req.params;
   const { contact } = req.body;
   dbQuery(`UPDATE contacts SET ? WHERE id = ${id}`, contact);
   return res.json({
      info: "Contact updated",
      contact: contact,
   });
};

export const deleteContact = (req: Request, res: Response) => {
   const { id } = req.params;
   dbQuery(`DELETE FROM contacts WHERE id = ${id}`, null);
   return res.json({
      info: "Contact deleted",
   });
};