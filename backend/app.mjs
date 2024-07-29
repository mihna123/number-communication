import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRouter from './routes/auth.route.mjs';
import postsRoute from './routes/posts.route.mjs';
import * as UserService from './services/user.service.mjs';

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


try {
    await mongoose.connect(mongoUri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
} catch (e) {
    await mongoose.disconnect();
    console.log(e);
}

app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use('/auth', authRouter);
app.use('/posts', postsRoute);

app.get('/users/:userId', async (req, res) => {
    const { userId } = req.params;
    const username = await UserService.getUsernameById(userId);
    res.json({ username });
})

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});
