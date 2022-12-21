import express from "express"
import { deleteRoom, getRooms, postRooms, putRoom } from "../controllers/rooms"
const roomsRouter = express.Router()


//Room routes//
roomsRouter.get('/rooms', getRooms)

roomsRouter.post("/rooms", postRooms);

roomsRouter.put("/room/:id", putRoom);

roomsRouter.delete("/room/:id", deleteRoom);

export default roomsRouter