import express from 'express';
import { signUpController } from 'controllers';

const authRouter = express.Router();

authRouter.get('/', (req, res) => res.send("AuthRouter is working."));

authRouter.post(
  '/signup',
    signUpController.signUpValidator(),
    signUpController.signUp
  );

export default authRouter;