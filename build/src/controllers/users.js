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
exports.deleteUser = exports.putUser = exports.postUsers = exports.getUser = exports.getUsers = void 0;
const databaseConnection_1 = require("../databaseConnection");
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const results = yield (0, databaseConnection_1.dbQuery)("SELECT * FROM users", null);
    return res.json({ users: results });
});
exports.getUsers = getUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield (0, databaseConnection_1.dbQuery)(`SELECT * FROM users WHERE id = ${id}`, null);
    return res.json({ user: result });
});
exports.getUser = getUser;
const postUsers = (req, res) => {
    const { user } = req.body;
    (0, databaseConnection_1.dbQuery)(`INSERT INTO users SET ?`, user);
    return res.json({
        info: "User posted",
        user: user,
    });
};
exports.postUsers = postUsers;
const putUser = (req, res) => {
    const { id } = req.params;
    const { user } = req.body;
    (0, databaseConnection_1.dbQuery)(`UPDATE users SET ? WHERE id = ${id}`, user);
    return res.json({
        info: "User updated",
        user: user,
    });
};
exports.putUser = putUser;
const deleteUser = (req, res) => {
    const { id } = req.params;
    (0, databaseConnection_1.dbQuery)(`DELETE FROM users WHERE id = ${id}`, null);
    return res.json({
        info: "User deleted",
    });
};
exports.deleteUser = deleteUser;
