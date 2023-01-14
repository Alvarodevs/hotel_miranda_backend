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
const mongoConnection_1 = require("../mongoConnection");
const schemas_1 = require("../schemas");
const getContacts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, mongoConnection_1.connection)();
    const contacts = yield schemas_1.Contact.find();
    res.json(contacts);
    yield (0, mongoConnection_1.disconnect)();
});
exports.getContacts = getContacts;
const getContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, mongoConnection_1.connection)();
    const { id } = req.params;
    const contact = yield schemas_1.Contact.findById(id);
    res.json(contact);
    yield (0, mongoConnection_1.disconnect)();
});
exports.getContact = getContact;
const postContacts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, mongoConnection_1.connection)();
    try {
        const contact = new schemas_1.Contact(req.body.contact);
        const postedContact = yield contact.save();
        res.status(201).json({ postedContact });
    }
    catch (error) {
        res.status(400).json({
            message: "Something went wrong, check contact details.",
        });
    }
    yield (0, mongoConnection_1.disconnect)();
});
exports.postContacts = postContacts;
const putContact = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, mongoConnection_1.connection)();
    try {
        const { id } = req.params;
        const contact = req.body.contact;
        const contactUpToDate = yield schemas_1.Contact.findOneAndUpdate({ _id: id }, contact);
        res.status(201).json({
            message: "Contact has been updated",
            contact: contactUpToDate,
        });
    }
    catch (error) {
        res.status(400).json({
            message: "Something went wrong, contact could not be updated.",
        });
    }
    yield (0, mongoConnection_1.disconnect)();
});
exports.putContact = putContact;
const deleteContact = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, mongoConnection_1.connection)();
    try {
        const { id } = req.params;
        const contactToDelete = yield schemas_1.Contact.findOneAndDelete({ _id: id });
        res.status(202).json({
            message: `Contact with id ${id} has been deleted`,
        });
    }
    catch (error) {
        res.status(400).json({
            message: "Something went wrong, contact still persists. Try again.",
        });
    }
    yield (0, mongoConnection_1.disconnect)();
});
exports.deleteContact = deleteContact;
