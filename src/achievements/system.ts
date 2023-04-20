import { logger } from "@bot/utils"
import { Achievement } from "./achievement"
import { Event, EventAchievementsRecord, Metrics } from "./types"



class AchievementsSystem {

  private achievements: EventAchievementsRecord

  constructor() {
    this.achievements = {}
  }

  /**
   * Привязать ачивку к системе ивентов
   */
  attach(achievement: Achievement) {
    for (const event of achievement.events) {
      if (!this.achievements[event]) {
        this.achievements[event] = []
      }
      this.achievements[event].push(achievement)
    }
  }

  /**
   * Вызов ивента в системе
   * 
   * Пока что возвращает массив названий ачивок, которые получил пользователь
   */
  async call(event: Event | Event[], userId: number, metrics: Metrics): Promise<string[]> {
    let events: Event[] = Array.isArray(event) ? event : [event]
    logger.info(`Events ${events.join(', ')} called`)

    const unlockedAchievementTitles: Array<Achievement["title"]> = []

    for(const event of events) {
      const achievements: Achievement[] = this.achievements[event]
      
      for (const achievement of achievements) {
        const isPasses = await achievement.check(userId, metrics)
        if (isPasses) {
          await achievement.addToUser(userId)
          unlockedAchievementTitles.push(achievement.title)
        }
      }
    }

    return unlockedAchievementTitles
  }
}

export default AchievementsSystem