"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRandomContact = exports.createRandomUser = exports.createRandomBooking = exports.createRandomRoom = void 0;
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
