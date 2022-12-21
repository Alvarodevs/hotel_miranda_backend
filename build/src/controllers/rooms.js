"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRoom = exports.putRoom = exports.postRooms = exports.getRooms = void 0;
const getRooms = (req, res) => {
    res.send("Rooms fetched");
};
exports.getRooms = getRooms;
const postRooms = (req, res) => {
    const { data } = req.body;
    console.log(data);
    res.send("Room posted");
};
exports.postRooms = postRooms;
const putRoom = (req, res) => {
    const { id } = req.params;
    const { data } = req.body;
    console.log(data);
    res.send(`Room ${id} updated`);
};
exports.putRoom = putRoom;
const deleteRoom = (req, res) => {
    const { id } = req.params;
    res.send(`Room ${id} deleted`);
};
exports.deleteRoom = deleteRoom;
