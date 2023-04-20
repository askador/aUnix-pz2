import { Bot } from "grammy"
import { MyContext } from "../../types"
import { logger } from "../../utils"
import achievements from "./achievements"
import start from "./start"


async function setup(bot: Bot<MyContext>) {
  logger.info("Setting up command handlers...")
  await start.setup(bot)
  await achievements.setup(bot)
}

export default { setup }
