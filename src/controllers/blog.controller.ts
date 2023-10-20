import { BlogEntity, UserEntity } from 'entities';
import { Request, Response } from 'express';
import { body } from 'express-validator';
import httpStatus from 'http-status';
import { blogService, userService } from 'services';
import { errorHandlerWrapper } from 'utils/errorHandler.wrapper';
import { AuthRequest } from 'types';
import { Logger } from 'utils';

export const getBlogsValidator = () => {
  return [
    body('userEmail').notEmpty().withMessage('User email is required.').isEmail().withMessage('Email type is invalid.'),
  ];
}

type Params = unknown;
type ResBody = unknown;
type ReqBody = {
  userName: string;
  userEmail : string;
  userPassword: string;
};
type ReqQuery = unknown;

export const getBlogsHandler = async (
  req: AuthRequest<Params, ResBody, ReqBody, ReqQuery>,
  res: Response
) => {

  // const user: UserEntity = req.user;

  const blogs: BlogEntity[] = await blogService.getBlogs();

  Logger.log(blogs);

  res.status(httpStatus.OK).json({blogs: blogs});
}

export const getBlogs = errorHandlerWrapper(getBlogsHandler);