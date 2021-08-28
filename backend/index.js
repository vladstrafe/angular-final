const express = require('express');
const morgan = require('morgan')
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors())

const { authRouter } = require('./controllers/authController'); 
const { authMiddleware } = require('./middlewares/authMiddleware'); 
const { gamesRouter } = require('./controllers/gamesController'); 
const { userRouter } = require('./controllers/usersController'); 
// const { trucksRouter } = require('./controllers/trucksController'); 

app.use(express.json());
app.use(morgan('tiny'));

app.use('/api/auth', authRouter);
app.use(authMiddleware);
app.use('/api/games', gamesRouter);
app.use('/api/users', userRouter);
// app.use('/api/trucks', trucksRouter);

const start = async () => {
    try {
        await mongoose.connect('mongodb+srv://testuser:testpass@cluster0.lpyof.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
            useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true
        });
    
        app.listen(8080);
    } catch (err) {
        console.error(`Error on server startup: ${err.message}`);
    }
}

start();