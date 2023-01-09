import { IRoom, IBooking, IUser, IContact } from "./interfaces";
import { Room, Booking, User, Contact } from "./schemas"
import { faker } from "@faker-js/faker";
import passCrypt from "./utils/passCrypt";
import { connection, disconnect } from "./mongoConnection";



const run = async (): Promise<void> => {
   await connection();
	await roomsCreator();
   await usersCreator();
	await bookingsCreator();
   await contactsCreator();
   await disconnect();
};

run();

//Storing data for booings
const rooms: Array<IRoom> = []
const users: Array<IUser> = [];



async function roomsCreator(): Promise<void> {
   for (let i = 0; i < 20; i++) {
      const randomRoom: IRoom = await createRandomRoom();
		rooms.push(randomRoom)
      await Room.create(randomRoom);
   }
};

async function  usersCreator(): Promise<void> {
   for (let i = 0; i < 20; i++) {
      const randomUser: IUser = await createRandomUser();
		users.push(randomUser);
		await User.create(randomUser);
   }
};

async function  bookingsCreator(): Promise<void> {
   for (let i = 0; i < 20; i++) {
		const user:  IUser = users[Math.round(Math.random() * users.length - 1)]
		const room: IRoom = rooms[Math.round(Math.random() * rooms.length - 1)];
      const randomBooking: IBooking = await createRandomBooking(
			await randomRoomInBooking(room), 
			await randomUserInBooking(user)
		);
		await Booking.create(randomBooking)
   }
};


async function contactsCreator(): Promise<void>  {
   for (let i = 0; i < 20; i++) {
      const randomContact: IContact = await createRandomContact();
      await Contact.create(randomContact);
   }
};

//Functions creators with fakerJS
async function createRandomRoom(): Promise<IRoom> {
   return new Room<IRoom>({
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
   });
};

async function createRandomUser(): Promise<IUser> {
   return new User<IUser>({
      image: faker.image.avatar(),
      name: faker.name.fullName(),
      email: faker.internet.email(),
      password: await passCrypt(faker.internet.password()),
      phone: faker.phone.number(),
      date: faker.date.past(),
      state: faker.datatype.boolean(),
      job_desc: faker.lorem.lines(4),
   });
};

async function createRandomBooking(room: IRoom, user: IUser): Promise<IBooking> {
   const checkInDate = faker.date.between(
      "2022-01-01T00:00:00.000Z",
      "2022-12-31T00:00:00.000Z"
   );
   return {
      user_id: user._id,
      room_id: room._id,
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

async function createRandomContact(): Promise<IContact> {
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




//GETTERS - Random data for bookings
async function randomRoomInBooking(room: IRoom): Promise<IRoom> {
	const roomDb = Room.findOne({'_id': room._id})
	return await roomDb.exec()
		.then(result => result)
};

async function randomUserInBooking(user: IUser): Promise<IUser> {
	
	const userDb = User.findOne({'_id': user._id})
	return await userDb.exec()
		.then((result) => result);
		
};

