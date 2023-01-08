import { NextFunction, Request, Response } from "express";
import { disconnect } from "../mongoConnection";
import { IContact } from "../interfaces";
import { Contact } from "../schemas";

export const getContacts = async (req: Request, res: Response) => {
   const contacts: IContact[] = await Contact.find();
   res.json(contacts);
   await disconnect();
};

export const getContact = async (req: Request, res: Response) => {
   const { id } = req.params;
   const contact: IContact | null = await Contact.findById(id);
   res.json(contact);
   await disconnect();
};

export const postContacts = async (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   
   try {
		const contact = new Contact(req.body.contact);
      const postedContact = await contact.save();
      res.status(201).json({ postedContact });
   } catch (error) {
      res.status(400).json({
         message: "Something went wrong, check contact details.",
      });
   }
   await disconnect();
};

export const putContact = async (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   try {
		const { id } = req.params;
      const contact: IContact = req.body.contact;
      const contactUpToDate = await Contact.findOneAndUpdate({ _id: id }, contact);
      res.status(201).json({
         message: "Contact has been updated",
         contact: contactUpToDate,
      });
   } catch (error) {
      res.status(400).json({
         message: "Something went wrong, contact could not be updated.",
      });
   }
   await disconnect();
};

export const deleteContact = async (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   
   try {
		const { id } = req.params;
      const contactToDelete = await Contact.findOneAndDelete({ _id: id });
      res.status(202).json({
         message: `Contact with id ${id} has been deleted`,
      });
   } catch (error) {
      res.status(400).json({
         message: "Something went wrong, contact still persists. Try again.",
      });
   }
   await disconnect();
};
