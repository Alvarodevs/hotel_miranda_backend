"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = require("../controllers/users");
const usersRouter = express_1.default.Router();
//Users routes//
usersRouter.get("/", users_1.getUsers);
usersRouter.get("/:id", users_1.getUser);
usersRouter.post("/", users_1.postUsers);
usersRouter.put("/:id", users_1.putUser);
usersRouter.delete("/:id", users_1.deleteUser);
exports.default = usersRouter;
