import { Bot } from 'grammy'
import { logger } from '../utils'
import { MyContext } from '../types'
import { hydrateContext } from '@grammyjs/hydrate'
import { sessionMiddleware } from './session'
import { messageCount } from './message-count'
import { cbQueryCount } from './cb-queries-count'
import updateUser from './update-user'
import loggingUpdates from './logging'

async function setup(bot: Bot<MyContext>) {
	logger.info('Setting up middlewares...')

	bot.use(updateUser)
	bot.use(loggingUpdates)
	bot.use(hydrateContext())
	bot.use(sessionMiddleware())
	bot.use(messageCount)
	bot.use(cbQueryCount)
}

export default { setup }
