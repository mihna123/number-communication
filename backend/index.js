require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRouter = require('./routes/auth.route.js');
const postsRoute = require('./routes/posts.route.js');
const UserService = require('./services/user.service.js');

const app = express();
const port = 8080;
const mongoUri = process.env.MONGO_URI;

const clientOptions = {
    serverApi: {
        version: '1',
        strict: true,
        deprecationErrors: true
    }
};


mongoose.connect(mongoUri, clientOptions).
    then(() => {
        mongoose.connection.db.admin().command({ ping: 1 })
            .catch(e => {
                mongoose.disconnect();
            })
    });

app.use(cookieParser());
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use('/auth', authRouter);
app.use('/posts', postsRoute);

app.get('/users/:userId', async (req, res) => {
    const { userId } = req.params;
    const username = await UserService.getUsernameById(userId);
    res.json({ username });
})

module.exports = app;
