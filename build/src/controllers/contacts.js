"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteContact = exports.putContact = exports.postContacts = exports.getContact = exports.getContacts = void 0;
const getContacts = (req, res) => {
    res.send("Contacts fetched");
};
exports.getContacts = getContacts;
const getContact = (req, res) => {
    const { id } = req.params;
    res.send(`Contact ${id} fetched`);
};
exports.getContact = getContact;
const postContacts = (req, res) => {
    const { data } = req.body;
    console.log(data);
    res.send("Contact posted");
};
exports.postContacts = postContacts;
const putContact = (req, res) => {
    const { id } = req.params;
    const { data } = req.body;
    console.log(data);
    res.send(`Contact ${id} updated`);
};
exports.putContact = putContact;
const deleteContact = (req, res) => {
    const { id } = req.params;
    res.send(`Contact ${id} deleted`);
};
exports.deleteContact = deleteContact;
