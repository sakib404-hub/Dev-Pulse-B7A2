import express, { type Application, type Request, type Response } from 'express';
import { UsersRoute } from './module/users/users.route';
import { issuesRoute } from './module/issues/issues.route';
const app : Application = express();
import cors from 'cors'
import gloabalErrorHandler from './middleware/globalErrorHandler';



//? middlewares
app.use(express.json());
app.use(cors(
    {
  origin: 'https://dev-pulse-b7-a2-seven.vercel.app',
}));


app.use('/api/auth', UsersRoute);
app.use('/api/issues', issuesRoute);



app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: 'Server is running successfully 🚀',
        data: {
            author: 'Md. Shakib Hossen',
            version: '1.0.0',
            uptime: `${Math.floor(process.uptime())} seconds`,
            timestamp: new Date().toISOString(),
        }
    });
});

app.use(gloabalErrorHandler);

export default app;