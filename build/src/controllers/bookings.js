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
const getBookings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const results = yield (0, mongoConnection_1.dbQuery)("SELECT * FROM bookings", null);
    return res.json({ bookings: results });
});
exports.getBookings = getBookings;
const getBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield (0, mongoConnection_1.dbQuery)(`SELECT * FROM bookings WHERE id = ${id}`, null);
    return res.json({ booking: result });
});
exports.getBooking = getBooking;
const postBookings = (req, res) => {
    const { booking } = req.body;
    (0, mongoConnection_1.dbQuery)(`INSERT INTO bookings SET ?`, booking);
    return res.json({
        info: "Booking posted",
        booking: booking,
    });
};
exports.postBookings = postBookings;
const putBooking = (req, res) => {
    const { id } = req.params;
    const { booking } = req.body;
    (0, mongoConnection_1.dbQuery)(`UPDATE bookings SET ? WHERE id = ${id}`, booking);
    return res.json({
        info: "Booking updated",
        booking: booking,
    });
};
exports.putBooking = putBooking;
const deleteBooking = (req, res) => {
    const { id } = req.params;
    (0, mongoConnection_1.dbQuery)(`DELETE FROM bookings WHERE id = ${id}`, null);
    return res.json({
        info: "Booking deleted",
    });
};
exports.deleteBooking = deleteBooking;
