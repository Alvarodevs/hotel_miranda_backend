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
// import { dbQuery } from "../mongoConnection";
const getBookings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.json({
        bookings: "Booking list"
    });
});
exports.getBookings = getBookings;
const getBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    return res.json({
        booking: "Booking"
    });
});
exports.getBooking = getBooking;
const postBookings = (req, res) => {
    const { booking } = req.body;
    return res.json({
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
