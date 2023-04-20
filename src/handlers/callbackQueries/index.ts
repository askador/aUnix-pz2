import { Bot } from "grammy"
import { MyContext } from "../../types"

import test from './test'

async function setup(bot: Bot<MyContext>) {
  await test.setup(bot)
}

export default { setup }
