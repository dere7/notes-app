const request = require("supertest")
const app = require("../app")

const usersService = require("../services/users")

describe("/auth", () => {
  const bruce = {
    email: "bruce@example.com",
    password: "bruce123",
  }
  beforeAll(async () => {
    await usersService.create(bruce)
  })

  test("POST /auth/login", () =>
    request(app)
      .post("/auth/login")
      .send(bruce)
      .expect(200)
      .expect("Content-Type", /json/)
      .expect(/token/)
      .expect(/(.*)\.(.*).(.*)/))
})
