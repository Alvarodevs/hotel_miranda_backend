"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
const connection = mysql_1.default.createConnection({
    host: 'localhost:',
    database: 'hotel_miranda',
    user: 'root',
    password: ''
});
connection.connect((error) => {
    try {
        console.log('MySQL connection succeded');
    }
    catch (_a) {
        throw error;
    }
});
exports.default = connection;
