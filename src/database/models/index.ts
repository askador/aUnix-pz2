import User from "./User"
import UserAchievements from './UserAchievements'


async function associateModels() {
  await User.associate()
  await UserAchievements.associate()
}



export {
  associateModels,
  User, 
  UserAchievements
}

