"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const rooms_1 = require("../controllers/rooms");
const roomsRouter = express_1.default.Router();
//Room routes//
roomsRouter.get('/rooms', rooms_1.getRooms);
roomsRouter.post("/rooms", rooms_1.postRooms);
roomsRouter.put("/room/:id", rooms_1.putRoom);
roomsRouter.delete("/room/:id", rooms_1.deleteRoom);
exports.default = roomsRouter;
