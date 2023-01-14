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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.putUser = exports.postUsers = exports.getUser = exports.getUsers = void 0;
const mongoConnection_1 = require("../mongoConnection");
const schemas_1 = require("../schemas");
const bcrypt_1 = __importDefault(require("bcrypt"));
const passCrypt_1 = __importDefault(require("../utils/passCrypt"));
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
    try {
        const user = new schemas_1.User(req.body.user);
        const postedUser = yield user.save();
        res.status(201).json({ postedUser });
    }
    catch (error) {
        res.status(400).json({
            message: "Something went wrong, check user details.",
        });
    }
    yield (0, mongoConnection_1.disconnect)();
});
exports.postUsers = postUsers;
//Hacer findOne con id, y comprobar si passw en db === passw en body
const putUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, mongoConnection_1.connection)();
    try {
        const { id } = req.params;
        const { image, name, email, password, phone, date, job_desc, state } = req.body.user;
        const userDb = yield schemas_1.User.findById(id);
        const user = {
            image: image ? image : userDb === null || userDb === void 0 ? void 0 : userDb.image,
            name: name ? name : userDb === null || userDb === void 0 ? void 0 : userDb.name,
            email: email ? email : userDb === null || userDb === void 0 ? void 0 : userDb.email,
            password: bcrypt_1.default.compare(password, String(userDb === null || userDb === void 0 ? void 0 : userDb.password)) ? yield (0, passCrypt_1.default)(password) : userDb === null || userDb === void 0 ? void 0 : userDb.password,
            phone: phone ? phone : userDb === null || userDb === void 0 ? void 0 : userDb.phone,
            date: date ? date : userDb === null || userDb === void 0 ? void 0 : userDb.date,
            job_desc: job_desc ? job_desc : userDb === null || userDb === void 0 ? void 0 : userDb.job_desc,
            state: state ? state : userDb === null || userDb === void 0 ? void 0 : userDb.state,
        };
        const userUpToDate = yield schemas_1.User.findOneAndUpdate({ _id: id }, user);
        res.json({
            message: "User has been updated",
            user: userUpToDate,
        });
    }
    catch (error) {
        res.status(400).json({
            message: "Something went wrong, user could not be updated.",
        });
    }
    yield (0, mongoConnection_1.disconnect)();
});
exports.putUser = putUser;
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, mongoConnection_1.connection)();
    try {
        const { id } = req.params;
        const userToDelete = schemas_1.User.findOneAndDelete({ _id: id });
        res.status(202).json({
            message: `User with id ${id} has been deleted`,
        });
    }
    catch (error) {
        res.status(400).json({
            message: "Something went wrong, user still persists. Try again.",
        });
    }
    return yield (0, mongoConnection_1.disconnect)();
});
exports.deleteUser = deleteUser;
