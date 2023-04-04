import express, { Request, Response, Express } from 'express'
import cors from 'cors'
import dotenv from 'dotenv';
import scrape from './routes/scrape'
import auth from './routes/auth'
import { checkAuth } from './handlers/auth';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

app.use(cors());
app.use(express.json());

app.use('/auth', auth)
app.use('/scrape', checkAuth, scrape)

app.use('/proxy', checkAuth)

app.get('/', (req: Request, res: Response) => {
	res.send('Express + TypeScript Server is running');
});


