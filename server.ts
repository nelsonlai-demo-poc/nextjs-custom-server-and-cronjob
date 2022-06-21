import express, { Request, Response } from 'express';
import next from 'next';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;

const cron = require('node-cron');

(async () => {
    try {
        await app.prepare();
        const server = express();
        server.all('*', (req: Request, res: Response) => {
            return handle(req, res);
        });
        server.listen(port, (err?: any) => {
            if (err) throw err;
            console.log(
                `> Ready on localhost:${port} - env ${process.env.NODE_ENV}`
            );
        });

        cron.schedule('* * * * *', () => {
            console.log('running a task every minute');
        });
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
})();
