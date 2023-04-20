import { Bot, InlineKeyboard } from 'grammy'
import { Chat } from '@grammyjs/types'
import { MyContext } from '@bot/types'
import { isPrivate } from '@bot/filters'

async function message(ctx: MyContext & { chat: Chat.PrivateChat }) {
	const kb: InlineKeyboard = new InlineKeyboard().text('Click me!', 'test')
	await ctx.reply(`Hello <i>${ctx.from.first_name}</>!\nYou sent ${ctx.session.metrics.messageCount} messages\nAnd you have ${ctx.session.metrics.cbQueriesCount} callback queries`, {reply_markup: kb})
}


async function setup(bot: Bot<MyContext>) {
	bot.filter(isPrivate).on('message', message)
}

export default { setup }
