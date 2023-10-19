import express from 'express';
import authRouter from './auth.router';

const appRoutes = express.Router();

appRoutes.use('/auth', authRouter);

export default appRoutes;