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
exports.createRandomContact = exports.createRandomUser = exports.createRandomBooking = exports.createRandomRoom = void 0;
const databaseConnection_1 = require("../databaseConnection");
const faker_1 = require("@faker-js/faker");
const createRandomRoom = () => {
    return {
        images: faker_1.faker.helpers.arrayElements([
            faker_1.faker.image.imageUrl(640, 480, "room"),
            faker_1.faker.image.imageUrl(640, 480, "room"),
            faker_1.faker.image.imageUrl(640, 480, "room"),
        ]),
        bed_type: faker_1.faker.helpers.arrayElement([
            "Single",
            "Double",
            "Double Superior",
            "Suite",
        ]),
        room_number: faker_1.faker.datatype.number({ min: 100, max: 899 }),
        description: faker_1.faker.lorem.lines(3),
        price: faker_1.faker.datatype
            .number({ min: 500, max: 1000, precision: 0.01 })
            .toString(),
        offer: faker_1.faker.datatype.boolean(),
        offer_price: faker_1.faker.datatype.number({ max: 100 }),
        cancellation: faker_1.faker.lorem.lines(5),
        facilities: faker_1.faker.helpers.arrayElements([
            "TV",
            "Bathtub",
            "Sea_view",
            "Late_checkout",
            "City_tour",
        ]),
        status: faker_1.faker.datatype.boolean(),
    };
};
exports.createRandomRoom = createRandomRoom;
function createRandomBooking() {
    const checkInDate = faker_1.faker.date.between("2022-01-01T00:00:00.000Z", "2022-12-31T00:00:00.000Z");
    return {
        photo: faker_1.faker.image.avatar(),
        guest_name: faker_1.faker.name.fullName(),
        check_in: faker_1.faker.date.between("2022-01-01T00:00:00.000Z", "2022-12-31T00:00:00.000Z"),
        check_out: faker_1.faker.date.between(checkInDate, "2023-01-31T00:00:00.000Z"),
        order_date: faker_1.faker.date.past(),
        request: faker_1.faker.lorem.paragraph(),
        bed_type: faker_1.faker.helpers.arrayElement([
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
        price: faker_1.faker.datatype.number({ min: 500, max: 3000, precision: 0.01 }),
        room_desc: faker_1.faker.lorem.paragraphs(2),
    };
}
exports.createRandomBooking = createRandomBooking;
const createRandomUser = () => {
    return {
        image: faker_1.faker.image.avatar(),
        name: faker_1.faker.name.fullName(),
        email: faker_1.faker.internet.email(),
        password: faker_1.faker.internet.password(),
        phone: faker_1.faker.phone.number(),
        date: faker_1.faker.date.past(),
        state: faker_1.faker.datatype.boolean(),
        job_desc: faker_1.faker.lorem.lines(4),
    };
};
exports.createRandomUser = createRandomUser;
const createRandomContact = () => {
    return {
        date: faker_1.faker.date.past(),
        customer: faker_1.faker.name.fullName(),
        email: faker_1.faker.internet.email(),
        phone: faker_1.faker.phone.number(),
        subject: faker_1.faker.lorem.words(6),
        comment: faker_1.faker.lorem.sentences(5),
        status: faker_1.faker.helpers.arrayElement(["publish", "archive"]),
    };
};
exports.createRandomContact = createRandomContact;
const roomsCreator = () => __awaiter(void 0, void 0, void 0, function* () {
    for (let i = 0; i < 20; i++) {
        const randomRoom = (0, exports.createRandomRoom)();
        databaseConnection_1.connection.query('INSERT INTO rooms SET ?', randomRoom, (error, results) => {
            if (error)
                console.log(error);
            console.log("Row", results);
        });
    }
});
roomsCreator();
const bookingsCreator = () => __awaiter(void 0, void 0, void 0, function* () {
    for (let i = 0; i < 20; i++) {
        const randomBooking = createRandomBooking();
        databaseConnection_1.connection.query("INSERT INTO bookings SET ?", randomBooking, (error, results) => {
            if (error)
                console.log(error);
            console.log("Row", results);
        });
    }
});
bookingsCreator();
const usersCreator = () => __awaiter(void 0, void 0, void 0, function* () {
    for (let i = 0; i < 20; i++) {
        const randomUser = (0, exports.createRandomUser)();
        databaseConnection_1.connection.query("INSERT INTO users SET ?", randomUser, (error, results) => {
            if (error)
                console.log(error);
            console.log("Row", results);
        });
    }
});
usersCreator();
const contactsCreator = () => __awaiter(void 0, void 0, void 0, function* () {
    for (let i = 0; i < 20; i++) {
        const randomContact = (0, exports.createRandomContact)();
        databaseConnection_1.connection.query("INSERT INTO contacts SET ?", randomContact, (error, results) => {
            if (error)
                console.log(error);
            console.log("Row", results);
        });
    }
});
contactsCreator();
databaseConnection_1.connection.end();
