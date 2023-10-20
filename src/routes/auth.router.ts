import express from 'express';
import { authController } from 'controllers';
import { checkToken } from 'utils';

const authRouter = express.Router();

authRouter.get('/', (req, res) => res.send("AuthRouter is working."));

authRouter.post(
  '/sign-up',
    authController.signUpValidator(),
    authController.signUp
  );

  authRouter.post(
    '/sign-in',
      authController.signInValidator(),
      authController.signIn,
  );

  authRouter.get(
    '/get-me',
    checkToken,
    authController.getMe,
  );

export default authRouter;