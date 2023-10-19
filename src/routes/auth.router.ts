import express from 'express';
import { authController } from 'controllers';

const authRouter = express.Router();

authRouter.get('/', (req, res) => res.send("AuthRouter is working."));

authRouter.post(
  '/signup',
    authController.signUpValidator(),
    authController.signUp
  );

  authRouter.post(
    '/signin',
      authController.signInValidator(),
      authController.signIn,
  );

export default authRouter;