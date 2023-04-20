import { achievementsSystem } from '@bot/achievements'
import { MyContext } from '@bot/types'
import { NextFunction } from 'grammy'

export async function messageCount(ctx: MyContext, next: NextFunction) {
	if (!!ctx.message) {
		ctx.session.metrics.messageCount++
		const unlockedAchs = await achievementsSystem.call('messageCountEvent', ctx.userObj.id, ctx.session.metrics)
		for (const ach of unlockedAchs) {
			await ctx.reply(`Congrats! You unlocked '${ach}' achievement!`)
		}
	}
	return await next()
}
