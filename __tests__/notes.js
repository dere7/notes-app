const request = require("supertest")
const app = require("../app")
const usersService = require("../services/users")
const notesService = require("../services/notes")
const login = require("../services/auth")

describe("/notes", () => {
  let note
  const userData = {
    email: "jake@gmail.com",
    password: "jake123",
  }
  beforeAll(async () => {
    const user = await usersService.create(userData)
    note = await notesService.create(
      {
        title: "dummy title",
        body: "this is body",
      },
      user.id
    )
  })

  test("GET /notes", () =>
    request(app)
      .get("/notes")
      .expect(200)
      .expect("Content-Type", /json/)
      .expect(/[(.*)]/)
      .expect(/dummy title/)
      .expect(/this is body/))

  test("GET /notes/:id", () =>
    request(app)
      .get(`/notes/${note.id}`)
      .expect(200)
      .expect("Content-Type", /json/)
      .expect(/{.*}/)
      .expect(/dummy title/))

  describe("after logging in", () => {
    let token
    beforeAll(async () => {
      token = await login(userData)
    })

    test("POST /notes", () =>
      request(app)
        .post("/notes")
        .set("Authorization", `Bearer ${token}`)
        .send({ title: "another note", body: "another body" })
        .expect(201)
        .expect("Content-Type", /json/)
        .expect(/another note/))

    test("PUT /notes/:id", () =>
      request(app)
        .put(`/notes/${note.id}`)
        .set("Authorization", `Bearer ${token}`)
        .send({ title: "updated" })
        .expect("Content-Type", /json/)
        .expect(200)
        .expect(/updated/))

    test("DELETE /notes/:id", () =>
      request(app)
        .del(`/notes/${note.id}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(204))
  })
})
