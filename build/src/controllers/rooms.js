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
exports.deleteRoom = exports.putRoom = exports.postRooms = exports.getRoom = exports.getRooms = void 0;
const databaseConnection_1 = require("../databaseConnection");
const getRooms = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const results = yield (0, databaseConnection_1.dbQuery)('SELECT * FROM rooms', null);
    return res.json({ rooms: results });
});
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
