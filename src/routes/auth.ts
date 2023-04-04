import express from 'express';
import { signIn, signUp } from '../handlers/auth';

const router = express.Router()

router.get('/signin', signIn)
router.get('/signup', signUp)