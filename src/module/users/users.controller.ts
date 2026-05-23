import type { Request, Response } from "express";
import sendResponse from "../../utility/sendResponse";
import { userService } from "./users.service";


const createUser = async(req : Request, res : Response)=>{
    try{

        const body = req.body;
        console.log(body);

        const result = await userService.createUserIntoDatabase(body);

        return sendResponse(res, 201, true, 'User registered successfully', result.rows[0]);

    }catch(err){
        if(err instanceof Error){
            return sendResponse(res, 500, false, 'Failed to create user, internal server Error', undefined, err.message)
        }
        return sendResponse(res, 500, false, 'Failed to create user!', undefined, 'Unknown Error Occured!')
    }
}

export const userController = {
    createUser
}