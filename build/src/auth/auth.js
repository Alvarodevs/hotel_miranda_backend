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
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = __importDefault(require("passport-local"));
const passport_jwt_1 = __importDefault(require("passport-jwt"));
const mongoConnection_1 = require("../mongoConnection");
const schemas_1 = require("../schemas");
const bcrypt_1 = __importDefault(require("bcrypt"));
const localStrategy = passport_local_1.default.Strategy;
const JWTStrategy = passport_jwt_1.default.Strategy;
const ExtractJwt = passport_jwt_1.default.ExtractJwt;
//this is middleware to verify with user/email, will be used in login controller called by "post" route
passport_1.default.use("login", new localStrategy({
    usernameField: "email",
    passwordField: "password",
}, (email, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, mongoConnection_1.connection)();
    try {
        //getter user by email & comparing password by bcrypt.compare
        const currentUser = yield schemas_1.User.findOne({ "email": email }).exec();
        if (!currentUser) {
            done(new Error("Please check your credentials"));
        }
        const passwordIsCorrect = yield bcrypt_1.default.compare(password, currentUser.password);
        if (!passwordIsCorrect) {
            if (email === process.env.PUBLIC_EMAIL && password === process.env.PUBLIC_PASSWORD) {
                const user = {
                    _id: 0,
                    email: process.env.PUBLIC_EMAIL,
                    name: "Alvaro G."
                };
                return done(null, user, { message: "User logged in" });
            }
            else {
                return done(new Error("Please check your credentials"), false, { message: "Please check your credentials" });
            }
        }
        else {
            return done(null, { _id: currentUser._id, email: currentUser.email, name: currentUser.name }, { message: "User logged in" });
        }
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
