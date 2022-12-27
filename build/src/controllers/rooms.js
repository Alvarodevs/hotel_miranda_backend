"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRoom = exports.putRoom = exports.postRooms = exports.getRoom = exports.getRooms = void 0;
const rooms_json_1 = __importDefault(require("../../db/rooms.json"));
const getRooms = (req, res) => {
    res.json(rooms_json_1.default);
};
exports.getRooms = getRooms;
const getRoom = (req, res) => {
    const { id } = req.params;
    res.send(`Room ${id} fetched`);
};
exports.getRoom = getRoom;
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
