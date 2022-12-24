"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const contacts_1 = require("../controllers/contacts");
const contactsRouter = express_1.default.Router();
//Contact routes//
contactsRouter.get("/", contacts_1.getContacts);
contactsRouter.get("/:id", contacts_1.getContact);
contactsRouter.post("/", contacts_1.postContacts);
contactsRouter.put("/:id", contacts_1.putContact);
contactsRouter.delete("/:id", contacts_1.deleteContact);
exports.default = contactsRouter;
