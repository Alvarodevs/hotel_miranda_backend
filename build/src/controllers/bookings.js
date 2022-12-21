"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBooking = exports.putBooking = exports.postBookings = exports.getBookings = void 0;
const getBookings = (req, res) => {
    res.send("Bookings fetched");
};
exports.getBookings = getBookings;
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
