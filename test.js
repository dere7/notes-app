const { createUserSchema } = require("./validations/users")

createUserSchema
  .validate({ email: "hello@g", password: "1234455" })
  .then(console.log)
  .catch((error) => console.log(error.errors))
