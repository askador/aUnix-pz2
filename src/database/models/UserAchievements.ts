import {
	DataTypes,
	Model,
	InferAttributes,
	InferCreationAttributes,
	CreationOptional,
} from 'sequelize'
import sequelize from '../connection'
import UserModel from './User'
import { Category } from '@bot/achievements/types'

class UserAchievements extends Model<
	InferAttributes<UserAchievements>,
	InferCreationAttributes<UserAchievements>
> {
	declare id: CreationOptional<number>
	declare userId: UserModel['id']
	declare achievementId: number
	declare category: Category

	static async associate() {}
}

UserAchievements.init(
	{
		id: {
			type: DataTypes.BIGINT,
			primaryKey: true,
			autoIncrement: true,
		},
		userId: {
			type: DataTypes.BIGINT,
			allowNull: false,
		},
		achievementId: {
			type: DataTypes.SMALLINT,
			allowNull: false,
		},
		category: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		tableName: 'user_achievements',
		timestamps: false,
		indexes: [
			{
				unique: true,
				fields: ['userId', 'achievementId'],
			},
		],
		sequelize,
	}
)

export default UserAchievements
