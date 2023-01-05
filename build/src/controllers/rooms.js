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
const schemas_1 = require("../schemas");
const getRooms = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, mongoConnection_1.connection)();
    const rooms = yield schemas_1.Room.find();
    res.json(rooms);
    yield (0, mongoConnection_1.disconnect)();
});
exports.getRooms = getRooms;
const getRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, mongoConnection_1.connection)();
    const { id } = req.params;
    const room = yield schemas_1.Room.findById(id);
    res.json(room);
    yield (0, mongoConnection_1.disconnect)();
});
exports.getRoom = getRoom;
const postRooms = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, mongoConnection_1.connection)();
    const room = new schemas_1.Room(req.body.room);
    try {
        const postedRoom = yield room.save();
        res.status(201).json({ postedRoom });
    }
    catch (error) {
        res.status(400).send({
            message: "Something went wrong, check room details.",
        });
        next(error);
    }
    yield (0, mongoConnection_1.disconnect)();
});
exports.postRooms = postRooms;
const putRoom = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, mongoConnection_1.connection)();
    const { id } = req.params;
    const room = req.body.room;
    try {
        const roomUpToDate = schemas_1.Room.findOneAndUpdate({ _id: id }, room);
        res.status(201).json({
            message: "Room has been updated",
            room: roomUpToDate,
        });
    }
    catch (error) {
        res.status(400).send({
            message: "Something went wrong, room could not be updated.",
        });
        next(error);
    }
    yield (0, mongoConnection_1.disconnect)();
});
exports.putRoom = putRoom;
const deleteRoom = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, mongoConnection_1.connection)();
    const { id } = req.params;
    try {
        const roomToDelete = schemas_1.Room.findOneAndDelete({ _id: id });
        res.status(202).json({
            message: `Room with id ${id} has been deleted`,
        });
    }
    catch (error) {
        res.status(400).send({
            message: "Something went wrong, room still persists. Try again.",
        });
        next(error);
    }
    return yield (0, mongoConnection_1.disconnect)();
});
exports.deleteRoom = deleteRoom;
