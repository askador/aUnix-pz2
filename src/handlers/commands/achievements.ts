import achievementList from "@bot/achievements/achievement-list"
import { UserAchievements } from "@bot/database/models"
import { MyContext } from "@bot/types"
import { Bot } from "grammy"

const STARS = ['⭐️', '☆']

function generateTable(userAchievements: UserAchievements[]) {
  
  let msg = '🎖 <b>Достижения</>\n\n'
  const achs: Record<string, number> = {}
  for (const achievement of userAchievements) {
    if (achievement.category in achs) {
      achs[achievement.category]++
    } else {
      achs[achievement.category] = 1
    }
  }
  for (const [category, count] of Object.entries(achs)) {
    const categoryAchievementCount = achievementList[category].length
    let stars = ''
    if (categoryAchievementCount !== 1) {
      stars = `${STARS[0].repeat(count)}${STARS[1].repeat(categoryAchievementCount-count)}`
    }
    msg += `• ${category} ${stars}\n`
  }
  return msg
}

async function achievements(ctx: MyContext) {
  const userAchievements = await ctx.userObj.getAchievements()
  const achievementsTable = generateTable(userAchievements)
  await ctx.reply(achievementsTable)
}

async function setup(bot: Bot<MyContext>) {
	bot.command('achievements', achievements)
}

export default { setup }