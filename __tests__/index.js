const request = require("supertest")

const app = require("../app")

test("GET /status", () =>
  request(app)
    .get("/status")
    .expect(200)
    .expect("Content-Type", /json/)
    .expect(/OK/))
