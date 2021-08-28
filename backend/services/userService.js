const { User } = require('../models/userModel');

const getUser = async (email) => {
	const user = await User.findOne({email})

	if (!user) throw new Error('No users found');
	
	return user
}

const patchUser = async (email, newUsername, newEmail, newAge) => {
	const user = await User.findOne({email})

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