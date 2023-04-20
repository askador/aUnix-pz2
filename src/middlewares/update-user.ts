import { NextFunction } from 'grammy'
import { User } from '@bot/database/models'
import { MyContext } from '@bot/types'

import { User as TGUser } from '@grammyjs/types'

async function getFullName(user: TGUser): Promise<string> {
	let res = user.first_name
	if (!!user.last_name) {
		res += ''
		res += user.last_name
	}
	return res
}

async function updateUser(ctx: MyContext, next: NextFunction) {
	const user = ctx.from
	
	if (!!user.is_bot) return 

	let userObj = await User.findByPk(user.id)
	let fullName = await getFullName(user)
	if (!!userObj) {
		userObj.fullName = fullName
	} else {
		userObj = User.build({
			id: user.id,
			fullName: fullName,
		})
	}
	await userObj.save()

	ctx.userObj = userObj

	return await next()
}

export default updateUser