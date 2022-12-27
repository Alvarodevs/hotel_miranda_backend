"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.putUser = exports.postUsers = exports.getUser = exports.getUsers = void 0;
const users_json_1 = __importDefault(require("../../db/users.json"));
const getUsers = (req, res) => {
    res.json(users_json_1.default);
};
exports.getUsers = getUsers;
const getUser = (req, res) => {
    const { id } = req.params;
    res.send(`User ${id} fetched`);
};
exports.getUser = getUser;
const postUsers = (req, res) => {
    const { data } = req.body;
    console.log(data);
    res.send("User posted");
};
exports.postUsers = postUsers;
const putUser = (req, res) => {
    const { id } = req.params;
    const { data } = req.body;
    console.log(data);
    res.send(`User ${id} updated`);
};
exports.putUser = putUser;
const deleteUser = (req, res) => {
    const { id } = req.params;
    res.send(`User ${id} deleted`);
};
exports.deleteUser = deleteUser;
