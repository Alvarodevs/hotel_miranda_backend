import request from "supertest";
import app from "../src/app";
import jwt from "jsonwebtoken";

const testToken = jwt.sign({
	user: {
		id: 1,
		email: "alvaro@example.com"
	}}, "key"
)

describe("Booking list", (): void => {
	test("not available without token", async (): Promise<void> => {
		const response = await request(app)
			.get("/bookings");
		
		expect(response.status).toBe(401)
	})
})