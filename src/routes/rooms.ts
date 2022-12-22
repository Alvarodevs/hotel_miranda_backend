import express from "express"
import { deleteRoom, getRooms, getRoom, postRooms, putRoom } from "../controllers/rooms"
const roomsRouter = express.Router()

//Room routes//
roomsRouter.get('/rooms', getRooms)

roomsRouter.get("/room/:id", getRoom);

roomsRouter.post("/rooms", postRooms);

roomsRouter.put("/room/:id", putRoom);

roomsRouter.delete("/room/:id", deleteRoom);

export default roomsRouter