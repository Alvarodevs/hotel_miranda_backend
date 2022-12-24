import express from "express"
import { deleteRoom, getRooms, getRoom, postRooms, putRoom } from "../controllers/rooms"
const roomsRouter = express.Router()

//Room routes//
roomsRouter.get('/', getRooms)

roomsRouter.get("/:id", getRoom);

roomsRouter.post("/", postRooms);

roomsRouter.put("/:id", putRoom);

roomsRouter.delete("/:id", deleteRoom);

export default roomsRouter