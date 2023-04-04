import express, { Request, Response, Express } from 'express'
import dotenv from 'dotenv';
import scrape from './routes/scrape'
import { checkAuth } from './handlers/auth';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

app.use('/auth', scrape)

app.use('/scrape', checkAuth, scrape)

app.get('/', (req: Request, res: Response) => {
	res.send('Express + TypeScript Server is running');
});


