import {connection} from "../databaseConnection";
import { IRoom } from "../interfaces/IRoom";
import { IBooking } from "../interfaces/IBooking";
import { IUser } from "../interfaces/IUser";
import { IContact } from "../interfaces/IContact";
import { faker } from "@faker-js/faker";

export const createRandomRoom = (): IRoom => {
   return {
      images: faker.helpers.arrayElements([
         faker.image.imageUrl(640, 480, "room"),
         faker.image.imageUrl(640, 480, "room"),
         faker.image.imageUrl(640, 480, "room"),
      ]),
      bed_type: faker.helpers.arrayElement([
         "Single",
         "Double",
         "Double Superior",
         "Suite",
      ]),
      room_number: faker.datatype.number({ min: 100, max: 899 }),
      description: faker.lorem.lines(3),
      price: faker.datatype
         .number({ min: 500, max: 1000, precision: 0.01 })
         .toString(),
      offer: faker.datatype.boolean(),
      offer_price: faker.datatype.number({ max: 100 }),
      cancellation: faker.lorem.lines(5),
      facilities: faker.helpers.arrayElements([
         "TV",
         "Bathtub",
         "Sea_view",
         "Late_checkout",
         "City_tour",
      ]),
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
      request: faker.lorem.paragraph(),
      bed_type: faker.helpers.arrayElement([
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
      price: faker.datatype.number({ min: 500, max: 3000, precision: 0.01 }),
      room_desc: faker.lorem.paragraphs(2),
   };
}

export const createRandomUser = (): IUser => {
   return {
      image: faker.image.avatar(),
      name: faker.name.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
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
      status: faker.helpers.arrayElement(["publish", "archive"]),
   };
};


const roomsCreator = async (): Promise<void> =>{
	for (let i = 0; i < 20; i++){
		const randomRoom = createRandomRoom();
		connection.query('INSERT INTO rooms SET ?', randomRoom, (error, results) => {
			if (error) console.log(error)
			console.log("Row", results)
		});
	}
	
}
roomsCreator();

const bookingsCreator = async (): Promise<void> => {
   for (let i = 0; i < 20; i++) {
      const randomBooking = createRandomBooking();
      connection.query(
         "INSERT INTO bookings SET ?",
         randomBooking,
         (error, results) => {
            if (error) console.log(error);
            console.log("Row", results);
         }
      );
   }
};
bookingsCreator();

const usersCreator = async (): Promise<void> => {
   for (let i = 0; i < 20; i++) {
      const randomUser = createRandomUser();
      connection.query(
         "INSERT INTO users SET ?",
         randomUser,
         (error, results) => {
            if (error) console.log(error);
            console.log("Row", results);
         }
      );
   }
};
usersCreator();

const contactsCreator = async (): Promise<void> => {
   for (let i = 0; i < 20; i++) {
      const randomContact = createRandomContact();
      connection.query(
         "INSERT INTO contacts SET ?",
         randomContact,
         (error, results) => {
            if (error) console.log(error);
            console.log("Row", results);
         }
      );
   }
};
contactsCreator();

connection.end();