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
const mongoConnection_1 = require("../mongoConnection");
const getRooms = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const results = yield (0, mongoConnection_1.dbQuery)('SELECT * FROM rooms', null);
    return res.json({ rooms: results });
});
exports.getRooms = getRooms;
const getRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield (0, mongoConnection_1.dbQuery)(`SELECT * FROM rooms WHERE id = ${id}`, null);
    return res.json({ room: result });
});
exports.getRoom = getRoom;
const postRooms = (req, res) => {
    const { room } = req.body;
    (0, mongoConnection_1.dbQuery)(`INSERT INTO rooms SET ?`, room);
    return res.json({
        info: "Room posted",
        room: room
    });
};
exports.postRooms = postRooms;
const putRoom = (req, res) => {
    const { id } = req.params;
    const { room } = req.body;
    (0, mongoConnection_1.dbQuery)(`UPDATE rooms SET ? WHERE id = ${id}`, room);
    return res.json({
        info: "Room updated",
        room: room
    });
};
exports.putRoom = putRoom;
const deleteRoom = (req, res) => {
    const { id } = req.params;
    (0, mongoConnection_1.dbQuery)(`DELETE FROM rooms WHERE id = ${id}`, null);
    return res.json({
        info: "Room deleted"
    });
};
exports.deleteRoom = deleteRoom;
