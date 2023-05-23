const express = require("express")
const { userExtractor, validate } = require("../utils/middlewares")
const { createUserSchema } = require("../validations/users")
const usersService = require("../services/users")

const usersRouter = express.Router()

usersRouter.post("/", validate(createUserSchema), async (req, res) => {
  const user = await usersService.create(req.body)
  res.status(201).json(user)
})

usersRouter.get("/me", userExtractor, async (req, res) => {
  const user = await usersService.findByEmail(req.user.email)
  res.json(user)
})

usersRouter.get("/me/notes", userExtractor, async (req, res) => {
  const notes = await usersService.findNotesByUser(req.user.sub)
  res.json(notes)
})

module.exports = usersRouter
