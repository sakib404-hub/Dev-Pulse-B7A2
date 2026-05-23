import type { NextFunction, Request, Response } from "express"
import sendResponse from "../utility/sendResponse";


const authMaintaner = () =>{
    return async(req : Request, res: Response, next: NextFunction)=>{
        const user = req.user;
        if(user.role === 'maintainer'){
            return next();
        }

        return sendResponse(res, 403, false, 'Valid token but insufficient role/permissions.', undefined, 'Only Maintainer can delete issues!');
    }
}

export default authMaintaner