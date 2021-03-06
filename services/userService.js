const { User } = require('../models/userModel');

const getUser = async (_id) => {
	const user = await User.findOne({_id})

	if (!user) throw new Error('No users found');
	
	return user
}

const patchUser = async (_id, newUsername, newEmail, newAge) => {
	const user = await User.findOne({_id})

	if (!user) throw new Error('No users found');

	user.username = newUsername
	user.email = newEmail
	user.age = newAge
	await user.save()
}

module.exports = {
	getUser,
	patchUser
}