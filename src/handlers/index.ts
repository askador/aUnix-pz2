import { Bot } from "grammy"
import { MyContext } from "../types"

import errors from "./errors"
import commands from "./commands"
import callbackQueries from "./callbackQueries"
import { logger } from "../utils"
import message from "./message"

async function setup(bot: Bot<MyContext>) {
  logger.info("Setting up handlers...")

  // await message.setup(bot)
  await commands.setup(bot)
  await errors.setup(bot)
  await callbackQueries.setup(bot)
}

export default { setup }
