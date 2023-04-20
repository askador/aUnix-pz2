import { logger } from "../utils"
import sequelize from "./connection"
import { associateModels } from "./models"

async function setup() {
  logger.info("Establishing Database connection...")
  try {
		await sequelize.authenticate()
	} catch (err) {
		logger.error('Unable to connect to the database')
		logger.error(err.message)
		process.exit(1)
	}
	await associateModels()
	await sequelize.sync({ alter: true })
}

export default { setup }
