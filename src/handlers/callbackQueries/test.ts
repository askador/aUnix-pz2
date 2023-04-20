import { MyContext } from "@bot/types"
import { Bot, InlineKeyboard } from "grammy"

async function test(ctx: MyContext) {
  await ctx.answerCallbackQuery('HEY!')
  const kb: InlineKeyboard = new InlineKeyboard().text('Click me!', 'test')
	await ctx.reply(`Hello <i>${ctx.from.first_name}</>!\nYou sent ${ctx.session.metrics.messageCount} messages\nAnd you have ${ctx.session.metrics.cbQueriesCount} callback queries`, {reply_markup: kb})
}

async function setup(bot: Bot<MyContext>) {
  bot.callbackQuery('test', test)
}

export default {setup}