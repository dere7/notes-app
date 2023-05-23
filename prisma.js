const { PrismaClient } = require("@prisma/client")

async function excludePasswordMiddleware(params, next) {
  const result = await next(params)
  if (params?.model === "User" && params?.args?.select?.password !== true) {
    delete result.password
  }
  return result
}

const prisma = new PrismaClient()
prisma.$use(excludePasswordMiddleware)

module.exports = prisma
