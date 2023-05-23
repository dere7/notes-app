const { DB_URI, PORT, JWT_SECRET } = process.env

module.exports = {
  DB_URI,
  PORT: PORT || 4001,
  JWT_SECRET,
}
