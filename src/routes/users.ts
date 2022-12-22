import express from "express";
import { getUsers, getUser, postUsers, putUser, deleteUser} from "../controllers/users";
const usersRouter = express.Router();

//Users routes//
usersRouter.get("/users", getUsers);

usersRouter.get("/user/:id", getUser);

usersRouter.post("/users", postUsers);

usersRouter.put("/user/:id", putUser);

usersRouter.delete("/user/:id", deleteUser);

export default usersRouter;
