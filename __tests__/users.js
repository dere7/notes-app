const request = require("supertest")
const app = require("../app")
const usersService = require("../services/users")
const login = require("../services/auth")

const data = {
  name: "John Doe",
  email: "john12@example.com",
  password: "john123",
}

describe("/users", () => {
  test("create user", () =>
    request(app)
      .post("/users")
      .send(data)
      .expect(201)
      .expect("Content-Type", /json/)
      .expect(/John Doe/))

  test("create user validates email", () =>
    request(app)
      .post("/users")
      .send({ email: "johngmail.com", password: "test123" })
      .expect(400)
      .expect("Content-Type", /json/)
      .expect(/error/))

  test("create user validates password", () =>
    request(app)
      .post("/users")
      .send({ email: "john@gmail.com", password: "test" })
      .expect(400)
      .expect("Content-Type", /json/)
      .expect(/error/))

  describe("/users/me", () => {
    let token
    beforeEach(async () => {
      const jane = {
        name: "Jane Doe",
        email: "jane12@example.com",
        password: "jane123",
      }
      await usersService.create(jane)
      token = await login(jane)
    })

    test("GET /users/me", () =>
      request(app)
        .get("/users/me")
        .set("Authorization", `Bearer ${token}`)
        .expect(200)
        .expect("Content-Type", /json/)
        .expect(/Jane Doe/))
  })
})
