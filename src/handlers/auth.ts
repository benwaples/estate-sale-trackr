import { NextFunction, Request, Response } from 'express';
import { verify } from '../utils/jwt';

export function checkAuth(req: Request, res: Response, next: NextFunction) {
	const token = req.get('Authorization');
	if (!token) {
		res.status(401).json({ error: 'no authorization found' });
		return;
	}

	let payload = null;
	try {
		payload = verify(token);
	}
	catch (err) {
		// this code runs with verify fails
		res.status(401).json({ error: 'invalid token' });
		return;
	}

	req.user = payload;
	next();
};

export async function signUp(req: Request, res: Response) {
	res.send(200)
}

export async function signIn(req: Request, res: Response) {
	res.send(200)
}
