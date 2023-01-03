"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bookingSchema = new mongoose_1.default.Schema({
    photo: String,
    guest_name: String,
    order_date: Date,
    check_in: Date,
    check_out: Date,
    request: String,
    room_type: String,
    status: String,
    price: Number,
    amenities: String,
    room_desc: String,
});
exports.Booking = mongoose_1.default.model('Booking', bookingSchema);
