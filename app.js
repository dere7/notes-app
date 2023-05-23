require("express-async-errors")
const express = require("express")
const authRouter = require("./routes/auth")
const usersRouter = require("./routes/users")
const notesRouter = require("./routes/notes")
const { notFound, errorHandler } = require("./utils/middlewares")

const app = express()
app.use(express.json())

app.use("/auth", authRouter)
app.use("/users", usersRouter)
app.use("/notes", notesRouter)

app.get("/status", (_req, res) => {
  res.json({ status: "OK" })
})

app.use(notFound)
app.use(errorHandler)

module.exports = app
