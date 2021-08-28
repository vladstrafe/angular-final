const mongoose = require('mongoose');

const User = mongoose.model('User', {
    username: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number
    },
    created_date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = { User };
