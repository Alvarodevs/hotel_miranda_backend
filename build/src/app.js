"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookings_1 = __importDefault(require("./routes/bookings"));
const rooms_1 = __importDefault(require("./routes/rooms"));
const users_1 = __importDefault(require("./routes/users"));
const contacts_1 = __importDefault(require("./routes/contacts"));
const login_1 = __importDefault(require("./routes/login"));
const passport_1 = __importDefault(require("passport"));
const cors_1 = __importDefault(require("cors"));
const mongoConnection_1 = require("./mongoConnection");
Promise.resolve().then(() => __importStar(require("./auth/auth")));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.get('/', (req, res) => {
    res.send('hello');
});
//Established connection to db
(0, mongoConnection_1.connection)();
app.use('/login', login_1.default);
app.use("/bookings", passport_1.default.authenticate("jwt", { session: false }), bookings_1.default);
app.use("/rooms", passport_1.default.authenticate("jwt", { session: false }), rooms_1.default);
app.use("/users", passport_1.default.authenticate("jwt", { session: false }), users_1.default);
app.use("/contacts", passport_1.default.authenticate("jwt", { session: false }), contacts_1.default);
app.listen(process.env.PORT, () => {
    console.log(`Server running on port: ${process.env.PORT}`);
});
//error handler
app.use((err, req, res, next) => {
    res.status(404).send({ error: err.message });
    res.status(500).send({ error: err.message });
});
exports.default = app;
