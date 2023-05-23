const jwt = require("jsonwebtoken")
const { Prisma } = require("@prisma/client")
const { JWT_SECRET } = require("./config")
const notesService = require("../services/notes")

const tokenExtractor = (req) => {
  const auth = req.headers.authorization
  let token
  if (auth && auth.startsWith("Bearer ")) [, token] = auth.split(" ")
  return token
}

const userExtractor = async (req, res, next) => {
  const token = tokenExtractor(req)
  if (token) {
    const user = jwt.verify(token, JWT_SECRET)
    req.user = user
    next()
  } else {
    res.status(401).json({ error: "token required" })
  }
}

const checkOwnershipNote = async (req, res, next) => {
  const note = await notesService.getOne(req.params.id)
  if (note.authorId === req.user.sub) next()
  else res.status(403).json({ error: "You are not the owner" })
}

const notFound = (req, res) => {
  res.status(404).end()
}

const errorHandler = (error, req, res, next) => {
  if (res.headersSent) return next(error)
  switch (error.name) {
    case "ValidationError":
      return res.status(400).json({ error: error.message })
    case "JsonWebTokenError":
      return res.status(400).json({ error: "invalid token" })
    default:
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      )
        return res.status(403).json({ error: "email is already taken" })
      // eslint-disable-next-line no-console
      console.log(error)
      return res
        .status(500)
        .json({ error: "something went wrong. It is not you." })
  }
}

const validate = (schema) => async (req, res, next) => {
  const data = await schema.validate(req.body, { stripUnknown: true })
  req.body = data
  next()
}

module.exports = {
  notFound,
  errorHandler,
  userExtractor,
  checkOwnershipNote,
  validate,
}
