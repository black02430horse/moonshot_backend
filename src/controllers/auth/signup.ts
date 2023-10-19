import { DuplicateError } from 'errors';
import { UserEntity } from 'entities';
import { Request, Response } from 'express';
import { body } from 'express-validator';
import httpStatus from 'http-status';
import { userService } from 'services';
import { encryptPassword } from 'utils';
import { errorHandlerWrapper } from 'utils/errorHandler.wrapper';

export const signUpValidator = () => {
  return [
    body('userName').notEmpty().withMessage('User name is required.'),
    body('userEmail').notEmpty().withMessage('User email is required.').isEmail().withMessage('Email type is invalid.'),
    body('userPassword').isLength({min: 8, max:30}).withMessage('The length of password must be between 8 and 30.')
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

export const signUpHandler = async (
  req: Request<Params, ResBody, ReqBody, ReqQuery>,
  res: Response
) => {
  const {userName, userEmail, userPassword} = req.body;
  const user = await userService.getUserFromEmail(userEmail);

  if(user) {
    throw new DuplicateError('The email is already exist.')
  } 

  const hasedPassword: string = await encryptPassword(userPassword);

  const newUser: UserEntity = await userService.createUser({
    userName: userName,
    userEmail: userEmail,
    userPassword: hasedPassword
  });

  res.status(httpStatus.OK).json(newUser);
}

export const signUp = errorHandlerWrapper(signUpHandler);