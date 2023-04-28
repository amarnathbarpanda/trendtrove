import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const authenticate = (req: Request, res: Response, next: NextFunction)=> {
    const token = req.headers["x-access-token"];

    if(!token){
        return res.status(403).json({message: "A token is required for authentication"});
    }

    try {
        //@ts-ignore
        const decode = jwt.verify(token, process.env.TOKEN_KEY)
        //@ts-ignore
        req.user = decode;
    } catch (error) {
        //@ts-ignore
        return res.status(401).json({message: "Invalid Token", error:error.message});
    }
    return next();
}

export default authenticate;