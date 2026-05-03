import express from 'express';
import userRouter from './routes/userRoutes.js';
import { initDatabase } from './config/db.js';

const app = express();
app.use(express.json());

app.use('/api/users', userRouter);

async function startServer() {
    try {
        await initDatabase();
        app.listen(3000, () => {
            console.log('Server running at http://localhost:3000');
        });
    } catch (error) {
        console.error('Database connection failed:', error.message);
        process.exit(1);
    }
}

startServer();
