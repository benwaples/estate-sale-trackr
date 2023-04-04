import express from 'express';
import { signIn, signUp } from '../handlers/auth';

const router = express.Router()

router.post('/signin', signIn)
router.post('/signup', (_, _1, next) => { console.log('not'); next() }, signUp)

export default router