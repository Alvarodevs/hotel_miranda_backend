import { dbQuery } from "./mongoConnection";
import { IRoom } from "./interfaces/IRoom";
import { IBooking } from "./interfaces/IBooking";
import { IUser } from "./interfaces/IUser";
import { IContact } from "./interfaces/IContact";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";

export const createRandomRoom = (): IRoom => {
   return {
      images: faker.image.imageUrl(640, 480, "room"),
      bed_type: faker.helpers.arrayElement([
         "Single",
         "Double",
         "Double Superior",
         "Suite",
      ]),
      room_number: faker.datatype.number({ min: 100, max: 899 }),
      description: faker.lorem.lines(3),
      price: faker.datatype.number({ min: 50000, max: 100000 }),
      offer: faker.datatype.boolean(),
      offer_price: faker.datatype.number({ max: 100 }),
      cancellation: faker.lorem.lines(3),
      facilities: String(
         faker.helpers.arrayElements([
            "TV",
            "Bathtub",
            "Sea_view",
            "Late_checkout",
            "City_tour",
         ])
      ),
      status: faker.datatype.boolean(),
   };
};

export function createRandomBooking(): IBooking {
   const checkInDate = faker.date.between(
      "2022-01-01T00:00:00.000Z",
      "2022-12-31T00:00:00.000Z"
   );
   return {
      photo: faker.image.avatar(),
      guest_name: faker.name.fullName(),
      check_in: faker.date.between(
         "2022-01-01T00:00:00.000Z",
         "2022-12-31T00:00:00.000Z"
      ),
      check_out: faker.date.between(checkInDate, "2023-01-31T00:00:00.000Z"),
      order_date: faker.date.past(),
      request: faker.lorem.lines(3),
      room_type: faker.helpers.arrayElement([
         "Single",
         "Double",
         "Double Superior",
         "Suite",
      ]),
      status: faker.helpers.arrayElement([
         "check_in",
         "check_out",
         "in_progress",
      ]),
      amenities: "LED tv, bath, late-checkout, sea view, city tour",
      price: faker.datatype.number({ min: 50000, max: 300000 }),
      room_desc: faker.lorem.paragraphs(2),
   };
}

export const createRandomUser = async (): Promise<IUser> => {
   return {
      image: faker.image.avatar(),
      name: faker.name.fullName(),
      email: faker.internet.email(),
      password: await passCrypt(faker.internet.password()),
      phone: faker.phone.number(),
      date: faker.date.past(),
      state: faker.datatype.boolean(),
      job_desc: faker.lorem.lines(4),
   };
};

export const createRandomContact = (): IContact => {
   return {
      date: faker.date.past(),
      customer: faker.name.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      subject: faker.lorem.words(6),
      comment: faker.lorem.sentences(5),
      archived: faker.datatype.boolean(),
   };
};

const passCrypt = async (pass: string): Promise<string> => {
   return await bcrypt.hash(pass, 10).then((result) => result);
};

const roomsCreator = (): void => {
   for (let i = 0; i < 20; i++) {
      const randomRoom = createRandomRoom();
      dbQuery("INSERT INTO rooms SET ?", randomRoom);
   }
};

const bookingsCreator = (): void => {
   for (let i = 0; i < 20; i++) {
      const randomBooking = createRandomBooking();
      dbQuery("INSERT INTO bookings SET ?", randomBooking);
   }
};

const usersCreator = (): void => {
   for (let i = 0; i < 20; i++) {
      const randomUser = createRandomUser();
      dbQuery("INSERT INTO users SET ?", randomUser);
   }
};

const contactsCreator = (): void => {
   for (let i = 0; i < 20; i++) {
      const randomContact = createRandomContact();
      dbQuery("INSERT INTO contacts SET ?", randomContact);
   }
};

const run = () => {
   roomsCreator();
   bookingsCreator();
   usersCreator();
   contactsCreator();
};

run();
