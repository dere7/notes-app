const prisma = require("../prisma")
const { hashPassword } = require("../utils")

const usersService = {
  async create(data) {
    const user = await prisma.user.create({
      data: {
        ...data,
        password: await hashPassword(data.password),
      },
    })
    console.log(user)
    return user
  },
  async findByEmail(email, includePassword = false) {
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        password: includePassword,
        name: true,
        notes: true,
        profile: true,
      },
    })
    return user
  },
  async findNotesByUser(authorId) {
    const notes = await prisma.note.findMany({
      where: {
        authorId,
      },
    })
    return notes
  },
}

module.exports = usersService
