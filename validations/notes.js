const { object, string } = require("yup")

const createNoteSchema = object({
  title: string().required(),
  body: string().required(),
})

const updateNoteSchema = object({
  title: string(),
  body: string(),
})

module.exports = {
  createNoteSchema,
  updateNoteSchema,
}
