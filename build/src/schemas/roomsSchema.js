"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Room = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const roomSchema = new mongoose_1.default.Schema({
    images: { type: String, required: true },
    bed_type: { type: String, required: true },
    room_number: { type: Number, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    offer: { type: Boolean, required: true },
    offer_price: { type: Number, required: true },
    cancellation: { type: String, required: true },
    facilities: { type: String, required: true },
    status: { type: Boolean, required: true },
});
exports.Room = mongoose_1.default.model('Room', roomSchema);
