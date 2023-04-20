import AchievementsSystem from './system'
import achievementList from './achievement-list'

const achievementsSystem = new AchievementsSystem()

function attachAchievements(object: Object) {
  for (const achievements of Object.values(object)) {
    if (achievements.constructor === Object) {
      attachAchievements(achievements)
    } else {
      for (const achievement of achievements) {
        achievementsSystem.attach(new achievement())
      }
    }
  }
}

attachAchievements(achievementList)

export { achievementsSystem }