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
exports.deleteBooking = exports.putBooking = exports.postBookings = exports.getBooking = exports.getBookings = void 0;
const mongoConnection_1 = require("../mongoConnection");
const schemas_1 = require("../schemas");
const getBookings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, mongoConnection_1.connection)();
    const bookings = yield schemas_1.Booking.find();
    res.json(bookings);
    yield (0, mongoConnection_1.disconnect)();
});
exports.getBookings = getBookings;
const getBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, mongoConnection_1.connection)();
    const { id } = req.params;
    const booking = yield schemas_1.Booking.findById(id);
    res.json(booking);
    yield (0, mongoConnection_1.disconnect)();
});
exports.getBooking = getBooking;
const postBookings = (req, res) => {
    const booking = req.body;
    res.json({
        info: "Booking posted",
        // booking: booking,
    });
};
exports.postBookings = postBookings;
const putBooking = (req, res) => {
    const { id } = req.params;
    const { booking } = req.body;
    return res.json({
        info: "Booking updated",
        // booking: booking,
    });
};
exports.putBooking = putBooking;
const deleteBooking = (req, res) => {
    const { id } = req.params;
    return res.json({
        info: "Booking deleted",
    });
};
exports.deleteBooking = deleteBooking;
