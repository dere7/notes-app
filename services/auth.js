const { comparePassword, generateToken } = require("../utils")
const usersService = require("./users")

// eslint-disable-next-line consistent-return
const login = async ({ email, password }) => {
  const user = await usersService.findByEmail(email, true)
  if (user && (await comparePassword(password, user.password)))
    return generateToken({
      sub: user.id,
      email,
    })
}

module.exports = login
