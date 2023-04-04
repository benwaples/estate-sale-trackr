
import jwt from 'jsonwebtoken';
import { Dictionary } from '../types';
import User from '../model/User';
const APP_SECRET = process.env.APP_SECRET || 'CHANGEMENOW';

export function sign(profile: Dictionary) {
	return jwt.sign({ id: profile.id }, APP_SECRET);
}

export function verify(token: string) {
	return jwt.verify(token, APP_SECRET) as User;
}