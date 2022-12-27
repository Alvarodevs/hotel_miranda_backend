"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBooking = exports.putBooking = exports.postBookings = exports.getBooking = exports.getBookings = void 0;
const bookings_json_1 = __importDefault(require("../../db/bookings.json"));
const getBookings = (req, res) => {
    res.json(bookings_json_1.default);
};
exports.getBookings = getBookings;
const getBooking = (req, res) => {
    const { id } = req.params;
    res.send(`Booking ${id} fetched`);
};
exports.getBooking = getBooking;
const postBookings = (req, res) => {
    const { data } = req.body;
    console.log(data);
    res.send("Booking posted");
};
exports.postBookings = postBookings;
const putBooking = (req, res) => {
    const { id } = req.params;
    const { data } = req.body;
    console.log(data);
    res.send(`Booking ${id} updated`);
};
exports.putBooking = putBooking;
const deleteBooking = (req, res) => {
    const { id } = req.params;
    res.send(`Booking ${id} deleted`);
};
exports.deleteBooking = deleteBooking;
