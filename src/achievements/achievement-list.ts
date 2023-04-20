import { Achievement } from './achievement'
import * as countable from './countable'
import { Category } from './types'

const achievementList: Record<Category, (typeof Achievement)[]> = {
	messageCount: [
		countable.messageCount.MessageCount10Achievement,
		countable.messageCount.MessageCount20Achievement,
		countable.messageCount.MessageCount100Achievement,
	],
	cbQueryCount: [countable.cbQueryCount.CbQueryCount5Achievement],
}

export default achievementList
