import {Request, Response, NextFunction} from 'express';
import {z, AnyZodObject} from 'zod';
import {userSignInSchema, userSignUpSchema} from '../models/User.schema.js';

export const validateSignUp = (schema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await userSignUpSchema.parse(req.body);
        next();
      } catch (err) {
        if (err instanceof z.ZodError) {
          res.status(400).json({ message: "Invalid Credentials", details: err.issues });
        } 
        if (err instanceof Error) {
          res.status(500).json({ message: "Internal server error" , error: err.message});
        }
      }
}

export const validateSignIn = (schema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) =>{
    try {
        userSignInSchema.parse(req.body);
        next();
      } catch (err) {
        if (err instanceof z.ZodError) {
          res.status(400).json({ message: "Invalid Credentials", details: err.issues });
        } 
        if (err instanceof Error) {
          res.status(500).json({ message: "Internal server error" , error: err.message});
        }
      }
}