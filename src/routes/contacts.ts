import express from "express";
import { getContacts, getContact, postContacts, putContact, deleteContact} from "../controllers/contacts";
const contactsRouter = express.Router();

//Contact routes//
contactsRouter.get("/", getContacts);

contactsRouter.get("/:id", getContact);

contactsRouter.post("/", postContacts);

contactsRouter.put("/:id", putContact);

contactsRouter.delete("/:id", deleteContact);

export default contactsRouter;
