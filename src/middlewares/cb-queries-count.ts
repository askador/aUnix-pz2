import { achievementsSystem } from '@bot/achievements'
import { MyContext } from '@bot/types'
import { NextFunction } from 'grammy'

export async function cbQueryCount(ctx: MyContext, next: NextFunction) {
	if (!!ctx.callbackQuery) {
		ctx.session.metrics.cbQueriesCount++
		const unlockedAchs = await achievementsSystem.call('cbQueriesCountEvent', ctx.userObj.id, ctx.session.metrics)
		for (const ach of unlockedAchs) {
			await ctx.reply(`Congrats! You unlocked '${ach}' achievement!`)
		}
	}
	return await next()
}
