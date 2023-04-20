import {
	DataTypes,
	Model,
	InferAttributes,
	InferCreationAttributes,
	HasManyGetAssociationsMixin,
	HasManyCreateAssociationMixin,
	HasManyAddAssociationMixin,
	HasManyAddAssociationsMixin,
} from 'sequelize'
import sequelize from '../connection'
import UserAchievements from './UserAchievements'


class UserModel extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>>{
	declare id: number
	declare fullName: string

	declare getAchievements: HasManyGetAssociationsMixin<UserAchievements>
	declare addAchievement: HasManyAddAssociationMixin<UserAchievements, 'id'>
	declare addAchievements: HasManyAddAssociationsMixin<UserAchievements, 'id'>
	declare createAchievement: HasManyCreateAssociationMixin<UserAchievements, 'userId'>

	static async associate() {
		UserModel.hasMany(UserAchievements, {
			foreignKey: 'userId',
			as: 'Achievements'
		})
	}

}

UserModel.init(
	{
		id: {
			type: DataTypes.BIGINT,
			primaryKey: true,
		},
		fullName: {
			type: DataTypes.STRING(65),
			allowNull: false,
		}
	},
	{
		tableName: 'users',
    timestamps: false,
		sequelize,
	}
)

export default UserModel