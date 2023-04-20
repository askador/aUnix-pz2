import { Achievement } from "../achievement"
import { Event, Metrics, Category } from "../types"
import { MessageCount10Achievement } from "./message-count"


export class CbQueryCount5Achievement extends Achievement {
	id = 2
	title = 'CallbackQuery Count'
	description = 'Send 5 callback queries'
	events: Event[] = ['cbQueriesCountEvent']
	category: Category = 'cbQueryCount'
	dependencies: (typeof Achievement)[] = [MessageCount10Achievement]

	async check(userId: number, metrics: Metrics): Promise<boolean> {
		if (!(await this.areDefaultConditionsSatisfied(userId))) return false 
		if (metrics.cbQueriesCount >= 5) {
			return true
		}
		return false
	}
}
