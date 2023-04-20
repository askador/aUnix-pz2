import { UserAchievements } from '@bot/database/models'
import { Category, IAchievement, Event, Metrics } from './types'


export class Achievement implements IAchievement {
	id: number
	title: string
	description: string
	events: Event[]
	category: Category
	dependencies: (typeof Achievement)[] // от каких ачивок зависит текущая

	async isUnlocked(userId: number): Promise<boolean> {
		if (this.id === undefined) throw new Error("Achievement id is not defined")
		const isExists = await UserAchievements.findOne({
			where: {
				userId: userId,
				achievementId: this.id,
			},
		})
		return !!isExists
	}

	async areDependenciesSatisfied(userId: number): Promise<boolean> {
		if (!Array.isArray(this.dependencies)) return true
		for (const ach of this.dependencies) {
			if ( !(await new ach().isUnlocked(userId)) ) return false
		}
		return true
	}

	async areDefaultConditionsSatisfied(userId: number): Promise<boolean> {
		if (await this.isUnlocked(userId)) return false
		if (!(await this.areDependenciesSatisfied(userId))) return false
		return true
	}

	async check(userId: number, metrics: Metrics): Promise<boolean> {
		throw new Error("Not implemented")
	}

	async addToUser(userId: number): Promise<void> {
		if (this.id === undefined) throw new Error("Achievement id is not defined")
		await UserAchievements.create({ userId: userId, achievementId: this.id, category: this.category })
	}
}
