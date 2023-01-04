"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contact = exports.User = exports.Room = exports.Booking = void 0;
const bookingSchema_1 = require("./bookingSchema");
Object.defineProperty(exports, "Booking", { enumerable: true, get: function () { return bookingSchema_1.Booking; } });
const roomsSchema_1 = require("./roomsSchema");
Object.defineProperty(exports, "Room", { enumerable: true, get: function () { return roomsSchema_1.Room; } });
const usersSchema_1 = require("./usersSchema");
Object.defineProperty(exports, "User", { enumerable: true, get: function () { return usersSchema_1.User; } });
const contactsSchema_1 = require("./contactsSchema");
Object.defineProperty(exports, "Contact", { enumerable: true, get: function () { return contactsSchema_1.Contact; } });