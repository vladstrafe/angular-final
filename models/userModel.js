const mongoose = require('mongoose');

const User = mongoose.model('User', {
    username: {
        type: String,
        default: ''
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
        type: Number,
        default: null
    },
    games: {
        type: Array,
        required: true
    },
    created_date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = { User };
