const { exec } = require("child_process")
const util = require("util")

const execPromisify = util.promisify(exec)
const clearDb = async () => execPromisify("yarn db:reset")

module.exports = clearDb
