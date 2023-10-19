import { CustomError, DuplicateError, NotFoundError } from 'errors';
import { UserEntity } from 'entities';
import { Request, Response } from 'express';
import { body } from 'express-validator';
import httpStatus from 'http-status';
import { userService } from 'services';
import { encryptPassword, comparePassword} from 'utils';
import { errorHandlerWrapper } from 'utils/errorHandler.wrapper';
import jwt from 'jsonwebtoken';
import { JWT_EXPIRATION_TIME, JWT_TOKEN } from 'config';

export const signInValidator = () => {
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

export const signInHandler = async (
  req: Request<Params, ResBody, ReqBody, ReqQuery>,
  res: Response
) => {
  const {userEmail, userPassword} = req.body;
  const user = await userService.getUserFromEmail(userEmail);

  if(!user) {
    throw new NotFoundError('The email is not exist.')
  } 

  const validatePassword: boolean = await comparePassword(userPassword, user.userPassword);

  if(!validatePassword) {
    throw new CustomError('The password is not correct.', httpStatus.BAD_REQUEST)
  } 

  const token: string = jwt.sign(
    {userEmail},
    JWT_TOKEN,
    {
      expiresIn: JWT_EXPIRATION_TIME
    }
  );

  res.status(httpStatus.OK).json({token: token});
}

export const signIn = errorHandlerWrapper(signInHandler);