"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.putUser = exports.postUsers = exports.getUser = exports.getUsers = void 0;
const getUsers = (req, res) => {
    res.send("Users fetched");
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
