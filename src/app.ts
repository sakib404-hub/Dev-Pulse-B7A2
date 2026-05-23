import express, { type Application, type Request, type Response } from 'express';
import { issuesRoute } from './module/issues/issues.route';
const app : Application = express();

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


export default app;