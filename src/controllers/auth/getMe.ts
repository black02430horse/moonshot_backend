import { CustomError, DuplicateError, NotFoundError } from 'errors';
import { UserEntity } from 'entities';
import { Request, Response } from 'express';
import { body } from 'express-validator';
import httpStatus from 'http-status';
import { errorHandlerWrapper } from 'utils/errorHandler.wrapper';
import jwt from 'jsonwebtoken';
import { JWT_EXPIRATION_TIME, JWT_TOKEN } from 'config';
import { AuthRequest } from 'types';

export const getMeValidator = () => {
  return [];
}

type Params = unknown;
type ResBody = unknown;
type ReqBody = {
  userName: string;
  userEmail : string;
  userPassword: string;
};
type ReqQuery = unknown;

export const getMeHandler = async (
  req: AuthRequest<Params, ResBody, ReqBody, ReqQuery>,
  res: Response
) => {

  const user: UserEntity = req.user;

  if(!user) {
    throw new NotFoundError('The User is not exist.')
  } 

  res.status(httpStatus.OK).json({user: user});
}

export const getMe = errorHandlerWrapper(getMeHandler);