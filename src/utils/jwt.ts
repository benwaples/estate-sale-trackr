
import jwt from 'jsonwebtoken';
import User from '../model/User';
const APP_SECRET = process.env.APP_SECRET || 'CHANGEMENOW';

export function sign(user: Omit<User, 'password'>) {
	return jwt.sign(user, APP_SECRET);
}

export function verify(token: string) {
	return jwt.verify(token, APP_SECRET) as User;
}