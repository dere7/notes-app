const prisma = require("../prisma")

const notesService = {
  async getAll(skip = 0, take = 10) {
    const notes = await prisma.note.findMany({
      skip,
      take,
      include: {
        author: {
          select: {
            name: true,
            profile: true,
          },
        },
      },
    })
    const total = await prisma.note.count()

    return {
      notes,
      skip,
      take,
      total,
    }
  },

  async getOne(id) {
    const note = await prisma.note.findUnique({
      where: { id },
      include: { author: true },
    })
    return note
  },

  async create(data, userId) {
    const note = await prisma.note.create({
      data: {
        ...data,
        author: {
          connect: { id: userId },
        },
      },
    })
    return note
  },

  async update(id, data) {
    const note = await prisma.note.update({
      where: { id },
      data,
    })
    return note
  },

  async remove(id) {
    await prisma.note.delete({ where: { id } })
  },
}

module.exports = notesService
