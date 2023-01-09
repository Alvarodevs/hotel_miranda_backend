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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schemas_1 = require("./schemas");
const faker_1 = require("@faker-js/faker");
const passCrypt_1 = __importDefault(require("./utils/passCrypt"));
const mongoConnection_1 = require("./mongoConnection");
const run = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, mongoConnection_1.connection)();
    yield roomsCreator();
    yield usersCreator();
    yield bookingsCreator();
    yield contactsCreator();
    yield (0, mongoConnection_1.disconnect)();
});
run();
//Storing data for booings
const rooms = [];
const users = [];
function roomsCreator() {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < 20; i++) {
            const randomRoom = yield createRandomRoom();
            rooms.push(randomRoom);
            yield schemas_1.Room.create(randomRoom);
        }
    });
}
;
function usersCreator() {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < 20; i++) {
            const randomUser = yield createRandomUser();
            users.push(randomUser);
            yield schemas_1.User.create(randomUser);
        }
    });
}
;
function bookingsCreator() {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < 20; i++) {
            const user = users[Math.round(Math.random() * users.length - 1)];
            const room = rooms[Math.round(Math.random() * rooms.length - 1)];
            const randomBooking = yield createRandomBooking(yield randomRoomInBooking(room), yield randomUserInBooking(user));
            yield schemas_1.Booking.create(randomBooking);
        }
    });
}
;
function contactsCreator() {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < 20; i++) {
            const randomContact = yield createRandomContact();
            yield schemas_1.Contact.create(randomContact);
        }
    });
}
;
//Functions creators with fakerJS
function createRandomRoom() {
    return __awaiter(this, void 0, void 0, function* () {
        return new schemas_1.Room({
            images: faker_1.faker.image.imageUrl(640, 480, "room"),
            bed_type: faker_1.faker.helpers.arrayElement([
                "Single",
                "Double",
                "Double Superior",
                "Suite",
            ]),
            room_number: faker_1.faker.datatype.number({ min: 100, max: 899 }),
            description: faker_1.faker.lorem.lines(3),
            price: faker_1.faker.datatype.number({ min: 50000, max: 100000 }),
            offer: faker_1.faker.datatype.boolean(),
            offer_price: faker_1.faker.datatype.number({ max: 100 }),
            cancellation: faker_1.faker.lorem.lines(3),
            facilities: String(faker_1.faker.helpers.arrayElements([
                "TV",
                "Bathtub",
                "Sea_view",
                "Late_checkout",
                "City_tour",
            ])),
            status: faker_1.faker.datatype.boolean(),
        });
    });
}
;
function createRandomUser() {
    return __awaiter(this, void 0, void 0, function* () {
        return new schemas_1.User({
            image: faker_1.faker.image.avatar(),
            name: faker_1.faker.name.fullName(),
            email: faker_1.faker.internet.email(),
            password: yield (0, passCrypt_1.default)(faker_1.faker.internet.password()),
            phone: faker_1.faker.phone.number(),
            date: faker_1.faker.date.past(),
            state: faker_1.faker.datatype.boolean(),
            job_desc: faker_1.faker.lorem.lines(4),
        });
    });
}
;
function createRandomBooking(room, user) {
    return __awaiter(this, void 0, void 0, function* () {
        const checkInDate = faker_1.faker.date.between("2022-01-01T00:00:00.000Z", "2022-12-31T00:00:00.000Z");
        return {
            user_id: user._id,
            room_id: room._id,
            photo: faker_1.faker.image.avatar(),
            guest_name: faker_1.faker.name.fullName(),
            check_in: faker_1.faker.date.between("2022-01-01T00:00:00.000Z", "2022-12-31T00:00:00.000Z"),
            check_out: faker_1.faker.date.between(checkInDate, "2023-01-31T00:00:00.000Z"),
            order_date: faker_1.faker.date.past(),
            request: faker_1.faker.lorem.lines(3),
            room_type: faker_1.faker.helpers.arrayElement([
                "Single",
                "Double",
                "Double Superior",
                "Suite",
            ]),
            status: faker_1.faker.helpers.arrayElement([
                "check_in",
                "check_out",
                "in_progress",
            ]),
            amenities: "LED tv, bath, late-checkout, sea view, city tour",
            price: faker_1.faker.datatype.number({ min: 50000, max: 300000 }),
            room_desc: faker_1.faker.lorem.paragraphs(2),
        };
    });
}
function createRandomContact() {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            date: faker_1.faker.date.past(),
            customer: faker_1.faker.name.fullName(),
            email: faker_1.faker.internet.email(),
            phone: faker_1.faker.phone.number(),
            subject: faker_1.faker.lorem.words(6),
            comment: faker_1.faker.lorem.sentences(5),
            archived: faker_1.faker.datatype.boolean(),
        };
    });
}
;
//---------------------------------------
//GETTERS - Random data for bookings
function randomRoomInBooking(room) {
    return __awaiter(this, void 0, void 0, function* () {
        const roomDb = schemas_1.Room.findOne({ '_id': room._id });
        return yield roomDb.exec()
            .then(result => result);
    });
}
;
function randomUserInBooking(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const userDb = schemas_1.User.findOne({ '_id': user._id });
        return yield userDb.exec()
            .then((result) => result);
    });
}
;
