const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require("./config")

const hashPassword = (password) => bcrypt.hash(password, 10)
const comparePassword = (password, hash) => bcrypt.compare(password, hash)

const generateToken = (payload) => jwt.sign(payload, JWT_SECRET)
const verifyToken = (token) => jwt.verify(token, JWT_SECRET)

module.exports = {
  hashPassword,
  comparePassword,
  generateToken,
  verifyToken,
}
