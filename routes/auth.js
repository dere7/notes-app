const express = require("express")
const login = require("../services/auth")

const authRouter = express.Router()

authRouter.post("/login", async (req, res) => {
  const token = await login(req.body)
  if (token) {
    res.json({ token })
  } else {
    res.status(400).json({ error: "invalid email or password" })
  }
})

module.exports = authRouter
