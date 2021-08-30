const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken');

const { getUser } = require('../services/userService')
const { patchUser } = require('../services/userService')

router.get('/profile', async (req, res) => {
	try {
		const { authorization } = req.headers;

		if (!authorization) throw 401

		const [, token] = authorization.split(' ');
		const tokenPayload = jwt.verify(token, 'secret');
		const userId = tokenPayload._id
		const user = await getUser(userId)

		res.json({
			username: user.username,
			email: user.email,
			age: user.age
		})
	} catch(err) {
		if (err == 401) res.status(401).json('please sign in')
		else res.status(500).json(err.message)
	}
})

router.patch('/profile', async (req, res) => {
	try {
		const { authorization } = req.headers;

		if (!authorization) throw 401

		const [, token] = authorization.split(' ');
		const tokenPayload = jwt.verify(token, 'secret');
		const userId = tokenPayload._id
		const newUsername = req.body.username
		const newEmail = req.body.email
		const newAge = req.body.age

		await patchUser(userId, newUsername, newEmail, newAge)
		res.json('User updated successfully')
	} catch(err) {
		res.status(401).json(err)
	}
})

module.exports = {
	userRouter: router
}