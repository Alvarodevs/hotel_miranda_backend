"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteContact = exports.putContact = exports.postContacts = exports.getContact = exports.getContacts = void 0;
const databaseConnection_1 = require("../databaseConnection");
const getContacts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const results = yield (0, databaseConnection_1.dbQuery)("SELECT * FROM contacts", null);
    return res.json({ contacts: results });
});
exports.getContacts = getContacts;
const getContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield (0, databaseConnection_1.dbQuery)(`SELECT * FROM contacts WHERE id = ${id}`, null);
    return res.json({ contact: result });
});
exports.getContact = getContact;
const postContacts = (req, res) => {
    const { contact } = req.body;
    (0, databaseConnection_1.dbQuery)(`INSERT INTO contacts SET ?`, contact);
    return res.json({
        info: "Contact posted",
        contact: contact,
    });
};
exports.postContacts = postContacts;
const putContact = (req, res) => {
    const { id } = req.params;
    const { contact } = req.body;
    (0, databaseConnection_1.dbQuery)(`UPDATE contacts SET ? WHERE id = ${id}`, contact);
    return res.json({
        info: "Contact updated",
        contact: contact,
    });
};
exports.putContact = putContact;
const deleteContact = (req, res) => {
    const { id } = req.params;
    (0, databaseConnection_1.dbQuery)(`DELETE FROM contacts WHERE id = ${id}`, null);
    return res.json({
        info: "Contact deleted",
    });
};
exports.deleteContact = deleteContact;
