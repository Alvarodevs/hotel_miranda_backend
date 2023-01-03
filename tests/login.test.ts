import request from "supertest";
import app from "../src/app";

describe("Login test", (): void => {

	test("is correct", async (): Promise<void> => {
		const response = await request(app)
			.post("/login")
			.send({
				email: "alvaro@example.com",
				password: "1234"
			})
		expect(response.status).toBe(200)
	})

	test("is not working", async (): Promise<void> => {
		const response = await request(app)
		.post("/login")
		.send({
			email: "john@doe.com",
			password: "fakepassw"
		})

		expect(response.status).toBe(500)
	})
});