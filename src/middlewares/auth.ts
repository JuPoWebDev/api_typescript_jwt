import {NextFunction, Response, Request} from "express";

import jwt from "jsonwebtoken";

export const auth = (req:Request, res:Response, next:NextFunction) => {
    try {
        if(req.headers.authorization) {
            const token:string= req.headers.authorization;
            const decodedToken = jwt.verify(token, process.env.PRIVATE_KEY as string);
            res.status(200).json({decodedToken:decodedToken})
            /*
            const userId:number = decodedToken.userId;
            if (req.body.userId && req.body.userId !== userId) {
                throw 'Invalid user ID';
            } else {
                req.auth = {userId}
                next();
                console.log("Not authorization set")
            }*/
        } else {
            res.status(404).json({err:"No autho header set"})
        }
    } catch {
        res.status(401).json({
            error: new Error('Invalid request !')
        });
    }
}