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
const mongoConnection_1 = require("../mongoConnection");
const schemas_1 = require("../schemas");
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, mongoConnection_1.connection)();
    const users = yield schemas_1.User.find();
    res.json(users);
    yield (0, mongoConnection_1.disconnect)();
});
exports.getUsers = getUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, mongoConnection_1.connection)();
    const { id } = req.params;
    const user = yield schemas_1.User.findById(id);
    res.json(user);
    yield (0, mongoConnection_1.disconnect)();
});
exports.getUser = getUser;
const postUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, mongoConnection_1.connection)();
    const user = new schemas_1.User(req.body.user);
    try {
        const postedUser = yield user.save();
        res.status(201).json({ postedUser });
    }
    catch (error) {
        res.status(400).send({
            message: "Something went wrong, check user details.",
        });
        next(error);
    }
    yield (0, mongoConnection_1.disconnect)();
});
exports.postUsers = postUsers;
const putUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, mongoConnection_1.connection)();
    const { id } = req.params;
    const user = req.body.user;
    try {
        const userUpToDate = schemas_1.User.findOneAndUpdate({ _id: id }, user);
        res.status(201).json({
            message: "User has been updated",
            user: userUpToDate,
        });
    }
    catch (error) {
        res.status(400).send({
            message: "Something went wrong, user could not be updated.",
        });
        next(error);
    }
    yield (0, mongoConnection_1.disconnect)();
});
exports.putUser = putUser;
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, mongoConnection_1.connection)();
    const { id } = req.params;
    try {
        const userToDelete = schemas_1.User.findOneAndDelete({ _id: id });
        res.status(202).json({
            message: `User with id ${id} has been deleted`,
        });
    }
    catch (error) {
        res.status(400).send({
            message: "Something went wrong, user still persists. Try again.",
        });
        next(error);
    }
    return yield (0, mongoConnection_1.disconnect)();
});
exports.deleteUser = deleteUser;
