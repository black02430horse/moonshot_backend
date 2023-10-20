import express from 'express';
import authRouter from './auth.router';
import blogRouter from './blog.router';

const appRoutes = express.Router();

appRoutes.use('/auth', authRouter);
appRoutes.use('/blog', blogRouter);

export default appRoutes;