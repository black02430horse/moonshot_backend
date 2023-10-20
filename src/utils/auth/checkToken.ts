import { MESSAGES, REASON_CODES } from 'consts';
import { NotFoundError } from 'errors';
import { Response } from 'express';
import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import { JWT_TOKEN } from 'config';
import { userService } from 'services';
import { Logger } from 'utils/logger';

export const checkToken = async (
  req: any,
  res: Response,
  next: Function
) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    console.log('token:', token);
    console.log('!!token:', !!token);
    if (token === 'Bearer') {
      throw new NotFoundError('Unauthorized', REASON_CODES.AUTH.UNAUTHORIZED);
    }
    const data: any = jwt.verify(token, JWT_TOKEN);


    const user = await userService.getUserFromEmail(data.userEmail);

    req.user = user;

    next();
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(error.errorCode).json({
        message: error.message,
        reason: error.reasonCode,
      });
    } else {
      res.status(httpStatus.UNAUTHORIZED).json({
        message: MESSAGES.UNAUTHORIZED,
        reason: REASON_CODES.AUTH.UNAUTHORIZED,
      });
    }
  }
};
