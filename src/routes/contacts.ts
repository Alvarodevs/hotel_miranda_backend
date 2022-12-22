import express from "express";
import { getContacts, getContact, postContacts, putContact, deleteContact} from "../controllers/contacts";
const contactsRouter = express.Router();

//Contact routes//
contactsRouter.get("/contacts", getContacts);

contactsRouter.get("/contact/:id", getContact);

contactsRouter.post("/contacts", postContacts);

contactsRouter.put("/contact/:id", putContact);

contactsRouter.delete("/contact/:id", deleteContact);

export default contactsRouter;
