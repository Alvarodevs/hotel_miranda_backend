import express from "express";
import { getUsers, getUser, postUsers, putUser, deleteUser} from "../controllers/users";
const usersRouter = express.Router();

//Users routes//
usersRouter.get("/", getUsers);

usersRouter.get("/:id", getUser);

usersRouter.post("/", postUsers);

usersRouter.put("/:id", putUser);

usersRouter.delete("/:id", deleteUser);

export default usersRouter;
