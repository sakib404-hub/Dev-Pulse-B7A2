import type { NextFunction, Request, Response } from "express"
import sendResponse from "../utility/sendResponse";
import { pool } from "../database";
import jwt, { type JwtPayload } from 'jsonwebtoken'
import config from "../config/config";


const authUpdation = () => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = req.user;

            const { id } = req.params;
            const issueResult = await pool.query(`SELECT * FROM issues WHERE id=$1`, [id]);

            if (issueResult.rowCount === 0) {
                return sendResponse(res, 404, false, 'No issue Found!');
            }

            const issue = issueResult.rows[0];

            if(user.role === 'maintainer'){
                return next();
            }

            if(user.role === 'contributor' && issue.reporter_id === user.id){
                return next();
            }

            return sendResponse(res, 403, false, 'Forbidden Access!');

        } catch (err: any) {
            if (err.name === 'JsonWebTokenError') {
                return sendResponse(res, 401, false, 'Invalid Token');
            }

            if (err.name === 'TokenExpiredError') {
                return sendResponse(res, 401, false, 'Token Expired');
            }
            next(err);
        }
    }
}

export default authUpdation;