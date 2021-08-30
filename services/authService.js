const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { User } = require('../models/userModel');

const registration = async ({email, password}) => {
    const user = new User({
        email,
        password: await bcrypt.hash(password, 10)
    });
    await user.save();
}

const logIn = async ({email, password}) => {
    const user = await User.findOne({email});

    if (!user) {
        throw new Error('login error !user');
    }

    if (!(await bcrypt.compare(password, user.password))) {
        throw new Error('login error, invalid password compare');
    }

    const token = jwt.sign({
        _id: user._id,
    }, 'secret');
    return token;
}

module.exports = {
    registration,
    logIn
};