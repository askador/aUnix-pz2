import { Achievement } from "../achievement"
import { Category, Event, Metrics } from "../types"
import { CbQueryCount5Achievement } from "./cb-query-count"


export class MessageCount10Achievement extends Achievement {
	id = 1
	title = 'Message Count 10'
	description = 'Send 10 messages'
	events: Event[] = ['messageCountEvent']
	category: Category = 'messageCount'

	async check(userId: number, metrics: Metrics): Promise<boolean> {
		if (!(await this.areDefaultConditionsSatisfied(userId))) return false 
		if (metrics.messageCount >= 10) {
			return true
		}
		return false
	}
}

export class MessageCount20Achievement extends Achievement {
	id = 3
	title = 'Message Count 20'
	description = 'Send 20 messages'
	events: Event[] = ['messageCountEvent']
	category: Category = 'messageCount'
	dependencies: (typeof Achievement)[] = [MessageCount10Achievement, CbQueryCount5Achievement]

	async check(userId: number, metrics: Metrics): Promise<boolean> {
		if (!(await this.areDefaultConditionsSatisfied(userId))) return false 
		if (metrics.messageCount >= 20) {
			return true
		}
		return false
	}
}

export class MessageCount100Achievement extends Achievement {
	id = 4
	title = 'Message Count 100'
	description = 'Send 100 messages'
	events: Event[] = ['messageCountEvent']
	category: Category = 'messageCount'
	dependencies: (typeof Achievement)[] = [MessageCount10Achievement, MessageCount20Achievement]

	async check(userId: number, metrics: Metrics): Promise<boolean> {
		if (!(await this.areDefaultConditionsSatisfied(userId))) return false 
		if (metrics.messageCount >= 100) {
			return true
		}
		return false
	}
}
