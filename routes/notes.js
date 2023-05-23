const express = require("express")
const {
  userExtractor,
  checkOwnershipNote,
  validate,
} = require("../utils/middlewares")
const notesService = require("../services/notes")
const { createNoteSchema, updateNoteSchema } = require("../validations/notes")

const notesRouter = express.Router()

notesRouter.get("/", async (req, res) => {
  const { limit = 10, skip = 0 } = req.query
  const notes = await notesService.getAll(+skip, +limit)
  res.json(notes)
})

notesRouter.post(
  "/",
  validate(createNoteSchema),
  userExtractor,
  async (req, res) => {
    const note = await notesService.create(req.body, req.user.sub)
    res.status(201).json(note)
  }
)

notesRouter.get("/:id", async (req, res) => {
  const note = await notesService.getOne(req.params.id)
  if (note) res.json(note)
  else res.status(404).end()
})

notesRouter.put(
  "/:id",
  validate(updateNoteSchema),
  userExtractor,
  checkOwnershipNote,
  async (req, res) => {
    const note = await notesService.update(req.params.id, req.body)
    if (note) res.json(note)
    else res.status(404).end()
  }
)

notesRouter.delete(
  "/:id",
  userExtractor,
  checkOwnershipNote,
  async (req, res) => {
    await notesService.remove(req.params.id)
    res.status(204).end()
  }
)

module.exports = notesRouter
