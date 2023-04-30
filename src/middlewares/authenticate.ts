import {NextFunction, Request, Response} from 'express';
import jwt, {JwtPayload} from 'jsonwebtoken';


interface UserRequest extends Request {
    user?: JwtPayload;
}


const authenticate = (req : UserRequest, res : Response, next : NextFunction) => {
    const token = req.headers["x-access-token"] as string;

    if (! token) {
        return res.status(403).json({message: "A token is required for authentication"});
    }

    try {
        const decode = jwt.verify(token, process.env.TOKEN_KEY!)as JwtPayload
        req.user = decode;
    } catch (error) {
        if (error instanceof Error) {
            return res.status(401).json({message: "Invalid Token", error: error.message});
        }

    }
    return next();
}

export default authenticate;
