import { NextFunction, Request, Response } from "express";
import { connection, disconnect } from "../mongoConnection";
import { IContact } from "../interfaces";
import { Contact } from "../schemas";
import { Types } from "mongoose";

export const getContacts = async (req: Request, res: Response) => {
   await connection();
   const contacts: IContact[] = await Contact.find();
   res.json(contacts);
   await disconnect();
};

export const getContact = async (req: Request, res: Response) => {
   await connection();
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
   await connection();
   const contact = new Contact(req.body.contact);
   try {
      const postedContact = await contact.save();
      res.status(201).json({ postedContact });
   } catch (error) {
      res.status(400).send({
         message: "Something went wrong, check contact details.",
      });
      next(error);
   }
   await disconnect();
};

export const putContact = async (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   await connection();
   const { id } = req.params;
   const contact: IContact = req.body.contact;
   try {
      const contactUpToDate = Contact.findOneAndUpdate({ _id: id }, contact);
      res.status(201).json({
         message: "Contact has been updated",
         contact: contactUpToDate,
      });
   } catch (error) {
      res.status(400).send({
         message: "Something went wrong, contact could not be updated.",
      });
      next(error);
   }
   await disconnect();
};

export const deleteContact = async (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   await connection();
   const { id } = req.params;
   try {
      const contactToDelete = Contact.findOneAndDelete({ _id: id });
      res.status(202).json({
         message: `Contact with id ${id} has been deleted`,
      });
   } catch (error) {
      res.status(400).send({
         message: "Something went wrong, contact still persists. Try again.",
      });
      next(error);
   }
   return await disconnect();
};
