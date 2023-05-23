const express = require("express")
const usersService = require("../services/users")
const { comparePassword, generateToken } = require("../utils")

const authRouter = express.Router()

authRouter.post("/login", async (req, res) => {
  const { password, email } = req.body
  const user = await usersService.findByEmail(email, true)
  if (user && (await comparePassword(password, user.password))) {
    const payload = {
      sub: user.id,
      email,
    }
    res.json({ token: generateToken(payload) })
  } else {
    res.status(400).json({ error: "invalid email or password" })
  }
})

module.exports = authRouter
