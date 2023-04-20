export interface Metrics {
  messageCount: number
  cbQueriesCount: number
}
export interface IAchievement {
	id: number
	title: string
	description: string
	events: Event[]
	category: Category
	dependencies?: (typeof Achievement)[]
	isUnlocked(userId: number): Promise<boolean>
	areDependenciesSatisfied(userId: number): Promise<boolean>
	areDefaultConditionsSatisfied(userId: number): Promise<boolean>
	check(userId: number, metrics: Metrics): Promise<boolean>
	addToUser(userId: number): Promise<void>
}

export type Event = `${keyof Metrics}Event`
export type EventAchievementsRecord = { [key in Event]?: Achievement[] }

export type Category = 
  | 'messageCount'
  | 'cbQueryCount'

  