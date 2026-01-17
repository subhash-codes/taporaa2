import express from 'express';
import { loginUser } from '../Controllers/userController.js';

const userRouter = express.Router();
userRouter.post("/login", loginUser);

export default userRouter;