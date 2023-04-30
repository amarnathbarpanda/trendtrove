import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken';

import User from "../models/User.model.js";

export const signUp = async (req:Request, res:Response) =>{
 
    try {
        const user = await User.findOne({email: req.body.email});
      
        if(user){
            return res.status(400).json({success: false, message: "Email Already Exists"});
        }

        const salt = 10;
        const hashedPassword = await bcryptjs.hash(req.body.password, salt);
        const newUser = await User.create({
            ...req.body, password: hashedPassword
        });

        res.status(201).json({success: true,message: "User created successfully!", data: {user: newUser}})

    } catch (error ) {
          if (error instanceof Error) {
            res.status(500).json({message: "Internal Server Error", error: error.message})
          }
       
    }
};

export const signIn = async (req: Request, res: Response) =>{
    const {email, password} = req.body;
    
    try {
        const user = await User.findOne({email: email});
        if(user && (await bcryptjs.compare(password, user.password))){

            const token = jwt.sign({ user_id: user._id }, process.env.TOKEN_KEY!, { expiresIn: "1m" });

            return res.status(200).json({success: true, message: "Signed in successfully",data : {user: user, token: token}});
        }

        return res.status(400).json({success: false, message: "Invalid Credentials"})
    } catch (error) {
        if (error instanceof Error) {
        res.status(500).json({success: false, message: "Internal server error", error: error.message});
        }
    }
}