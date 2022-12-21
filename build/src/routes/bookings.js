"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookings_1 = require("../controllers/bookings");
const bookingsRouter = express_1.default.Router();
//Booking routes//
bookingsRouter.get('/bookings', bookings_1.getBookings);
bookingsRouter.post("/bookings", bookings_1.postBookings);
bookingsRouter.put("/booking", (_req, res) => {
    res.send("Booking updated");
});
bookingsRouter.delete("/booking", (_req, res) => {
    res.send("Booking deleted");
});
exports.default = bookingsRouter;
