import express from "express";
import { signIn, signUp } from "../controllers/userController.js";
import { validateSignIn, validateSignUp } from "../middlewares/validate.js";
import { userSignInSchema, userSignUpSchema } from "../models/User.schema.js";

export const userRouter = express.Router();

userRouter.post("/api/signup", validateSignUp(userSignUpSchema), signUp);

userRouter.post("/api/signin", validateSignIn(userSignInSchema), signIn)