import { dbQuery } from "./databaseConnection";
import { IRoom } from "./interfaces/IRoom";
import { IBooking } from "./interfaces/IBooking";
import { IUser } from "./interfaces/IUser";
import { IContact } from "./interfaces/IContact";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";



const run = async () => {
   await roomsCreator();
   await usersCreator();
   await bookingsCreator();   
   await contactsCreator();
};



async function createRandomRoom(): Promise<IRoom> {
   return await {
      images: faker.image.imageUrl(640, 480, "hotel-room"),
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
            "bed",
            "wifi",
            "parking",
            "air_cond",
            "gym",
            "no_smoke",
            "bar"
         ])
      ),
      status: faker.datatype.boolean(),
   };
};

async function createRandomBooking(): Promise<IBooking> {
   const checkInDate = faker.date.between(
      "2022-01-01T00:00:00.000Z",
      "2022-12-31T00:00:00.000Z"
   );
   return await {
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

async function passCrypt(pass: string): Promise<string> {
   //console.log(typeof pass);
   return await bcrypt.hash(pass, 10).then((res: string) => res);
   //no imprime esto en clg
   // console.log('result passcrypt', result)
   
};

async function createRandomUser (): Promise<IUser> {
   //no imprime esto en clg
   return {
      image: faker.image.avatar(),
      name: faker.name.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      date: faker.date.past(),
      state: faker.datatype.boolean(),
      job_desc: faker.lorem.lines(4),
      password: await passCrypt(faker.internet.password()),
   };
};

async function createRandomContact (): Promise<IContact> {
   return await {
      date: faker.date.past(),
      customer: faker.name.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      subject: faker.lorem.words(6),
      comment: faker.lorem.sentences(5),
      archived: faker.datatype.boolean(),
   };
};



const roomsCreator = async (): Promise<void> => {
   for (let i = 0; i < 20; i++) {
      const randomRoom = await createRandomRoom();
      dbQuery("INSERT INTO rooms SET ?", randomRoom);
   }
};

const usersCreator = async (): Promise<void> => {
   for (let i = 0; i < 20; i++) {
      const randomUser = await createRandomUser();
      dbQuery("INSERT INTO users SET ?", randomUser);
   }
};

const bookingsCreator = async (): Promise<void> => {
   for (let i = 0; i < 20; i++) {
      const randomBooking = await createRandomBooking();
      dbQuery("INSERT INTO bookings SET ?", randomBooking);
   }
};

const contactsCreator = async (): Promise<void> => {
   for (let i = 0; i < 20; i++) {
      const randomContact = await createRandomContact();
      dbQuery("INSERT INTO contacts SET ?", randomContact);
   }
};

run();