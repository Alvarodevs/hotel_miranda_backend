"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = __importDefault(require("passport-local"));
const passport_jwt_1 = __importDefault(require("passport-jwt"));
const localStrategy = passport_local_1.default.Strategy;
const JWTStrategy = passport_jwt_1.default.Strategy;
const ExtractJwt = passport_jwt_1.default.ExtractJwt;
//this is middleware to verify with user/email, will be used in login controller called by "post" route
passport_1.default.use("login", new localStrategy({
    usernameField: "email",
    passwordField: "password",
}, (email, password, done) => {
    try {
        if (email === 'alvaro@example.com' && password === '1234') {
            const user = {
                id: 0,
                email: email
            };
            return done(null, user, { message: "User logged in" });
        }
        else
            return done(null, false, { message: "Please check your credentials" });
    }
    catch (error) {
        return done(error);
    }
}));
//With JWT
passport_1.default.use(new JWTStrategy({
    secretOrKey: "TOP_SECRET",
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}, (token, done) => {
    try {
        return done(null, token.user);
    }
    catch (error) {
        done(error);
    }
}));
