const { string, object } = require("yup")

const createUserSchema = object({
  name: string(),
  email: string().email().required(),
  password: string().min(6).required(),
})

const updateUserSchema = object({
  name: string(),
  password: string().min(6),
})

module.exports = {
  createUserSchema,
  updateUserSchema,
}
