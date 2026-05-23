import type { NextFunction, Request, Response } from "express";
import sendResponse from "../utility/sendResponse";
import jwt, { type JwtPayload } from "jsonwebtoken";
import config from "../config/config";
import { pool } from "../database";

const auth = () => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try{

        const token = req.headers.authorization;

        if(!token){
            return sendResponse(res,401, false, 'Unauthorized Access!');
        }

        const decoded = jwt.verify(token as string, config.jwtSecret as string) as JwtPayload;
        const email = decoded.email;

        const user = await pool.query(`SELECT * FROM users WHERE email=$1`, [email]);

        if(user.rowCount === 0){
            return sendResponse(res, 404, false, 'User not found');
        }
        
        req.user = user.rows[0];
        next()

        }catch(err : any){
            if(err.name === 'JsonWebTokenError'){
                return sendResponse(res, 401, false, 'Invalid Token');
            }

             if (err.name === 'TokenExpiredError') {
                return sendResponse(res, 401, false, 'Token Expired');
            }
           next(err);
        }
    }
}

export default auth;
