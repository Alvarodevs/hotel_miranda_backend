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
const bcrypt_1 = __importDefault(require("bcrypt"));
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = __importDefault(require("passport-local"));
const passport_jwt_1 = __importDefault(require("passport-jwt"));
const databaseConnection_1 = require("../databaseConnection");
const localStrategy = passport_local_1.default.Strategy;
const JWTStrategy = passport_jwt_1.default.Strategy;
const ExtractJwt = passport_jwt_1.default.ExtractJwt;
//this is middleware to verify with user/email, will be used in login controller called by "post" route
passport_1.default.use("login", new localStrategy({
    usernameField: "email",
    passwordField: "password",
}, (email, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //const passCrypted = await bcrypt.compare(password, 10);
        const user = yield (0, databaseConnection_1.dbQuery)("SELECT * FROM users WHERE email = ?;", [email]).then((user) => user);
        const isCorrectPassword = yield bcrypt_1.default.compare(password, user[0].password);
        if (!isCorrectPassword) {
            if (email === process.env.PUBLIC_EMAIL &&
                password === process.env.PUBLIC_PASSWORD) {
                const user = {
                    id: 1,
                    email: process.env.PUBLIC_EMAIL,
                };
                return done(null, user[0], { message: "User logged in" });
            }
            else {
                return done(null, false, {
                    message: "Please check your credentials",
                });
            }
        }
        else {
            return done(null, { id: user[0].id, email: user[0].email, name: user[0].name }, { message: "User logged in" });
        }
        //else return done(null, false, { message: "Please check your credentials" });
    }
    catch (error) {
        return done(error);
    }
})));
//With JWT
passport_1.default.use(new JWTStrategy({
    secretOrKey: "key",
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
}, (token, done) => {
    try {
        return done(null, token.user);
    }
    catch (error) {
        done(error);
    }
}));
