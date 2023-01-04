import { IRoom, IBooking, IUser, IContact } from "./interfaces";
import { Room, Booking, User, Contact } from "./schemas"
import { faker } from "@faker-js/faker";
import passCrypt from "./utils/passCrypt";
import { connection, disconnect } from "./mongoConnection";

const run = async (): Promise<void> => {
   await connection();
   await bookingsCreator();
	await roomsCreator();
   await usersCreator();
   await contactsCreator();
   await disconnect();
};

run();

//Functions creators with fakerJS
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
//---------------------------------------


const roomsCreator = async (): Promise<void> => {
   for (let i = 0; i < 20; i++) {
      const randomRoom: IRoom = createRandomRoom();
      await Room.create(randomRoom);
   }
};

const bookingsCreator = async (): Promise<void> => {
   for (let i = 0; i < 20; i++) {
      const randomBooking: IBooking = createRandomBooking();
		await Booking.create(randomBooking)
   }
};

const usersCreator = async (): Promise<void> => {
   for (let i = 0; i < 20; i++) {
      const randomUser: IUser = await createRandomUser();
		await User.create(randomUser);
   }
};

const contactsCreator = async (): Promise<void> => {
   for (let i = 0; i < 20; i++) {
      const randomContact: IContact = createRandomContact();
      await Contact.create(randomContact);
   }
};



