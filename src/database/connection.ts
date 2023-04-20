import { Sequelize } from 'sequelize'

const sequelize: Sequelize = new Sequelize({
	database: process.env.DB_NAME,
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	host: process.env.DB_HOST,
	port: +process.env.DB_PORT,
	dialect: 'postgres',
	timezone: 'Europe/Kiev',
	logging: false, // console.log,
	pool: {
		max: 20,
		idle: 10000,
	},
})

export default sequelize