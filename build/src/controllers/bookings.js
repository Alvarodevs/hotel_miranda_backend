"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postBookings = exports.getBookings = void 0;
const getBookings = (req, res) => {
    res.send("Bookings fetched");
};
exports.getBookings = getBookings;
const postBookings = (req, res) => {
    req.body({ data: "new booking" });
    res.send("Data posted");
};
exports.postBookings = postBookings;
