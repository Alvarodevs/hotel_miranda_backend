CREATE DATABASE hotel_miranda;

USE hotel_miranda;

CREATE TABLE rooms (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    bed_type VARCHAR(50),
	 room_number INT,
	 description VARCHAR(255),
    price INT,
    offer BOOLEAN,
	 offer_price INT,
	 cancellation VARCHAR(255),
	 facilities VARCHAR(255),
    status BOOLEAN
);

CREATE TABLE images(
  id INT AUTO_INCREMENT PRIMARY KEY,
  url VARCHAR(255)
);

CREATE TABLE bookings (
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  photo text,
  guest_name varchar(255) NOT NULL,
  order_date date NOT NULL,
  check_in datetime NOT NULL,
  check_out date NOT NULL,
  request varchar(255) DEFAULT NULL,
  room_type varchar(45) NOT NULL,
  status varchar(45) NOT NULL,
  price int NOT NULL,
  amenities varchar(255) NOT NULL,
  room_desc text NOT NULL
);

CREATE TABLE users (
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  image varchar(255) DEFAULT NULL,
  name varchar(100) NOT NULL,
  email varchar(100) NOT NULL,
  phone varchar(30) NOT NULL,
  date date NOT NULL,
  job_desc text NOT NULL,
  state tinyint NOT NULL
); 

CREATE TABLE contacts (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  date DATE NOT NULL,
  customer VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  phone VARCHAR(30) NOT NULL,
  subject VARCHAR(255) NULL,
  comment TEXT NOT NULL,
  status TINYINT NOT NULL
);

CREATE TABLE bookings_rooms(
  id INT AUTO_INCREMENT PRIMARY KEY,
  roomId INT NOT NULL,
  bookingId INT NOT NULL,
  CONSTRAINT fk_br_room
    FOREIGN KEY (roomId)
      REFERENCES rooms(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
  CONSTRAINT fk_br_booking
    FOREIGN KEY (bookingId)
      REFERENCES bookings(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);
