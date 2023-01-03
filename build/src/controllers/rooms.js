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
const getRooms = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.json({ rooms: "Rooms" });
});
exports.getRooms = getRooms;
const getRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    return res.json({ room: "Room" });
});
exports.getRoom = getRoom;
const postRooms = (req, res) => {
    const { room } = req.body;
    return res.json({
        info: "Room posted",
        room: room
    });
};
exports.postRooms = postRooms;
const putRoom = (req, res) => {
    const { id } = req.params;
    const { room } = req.body;
    return res.json({
        info: "Room updated",
        room: room
    });
};
exports.putRoom = putRoom;
const deleteRoom = (req, res) => {
    const { id } = req.params;
    return res.json({
        info: "Room deleted"
    });
};
exports.deleteRoom = deleteRoom;
