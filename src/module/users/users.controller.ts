import type { Request, Response } from "express";
import sendResponse from "../../utility/sendResponse";
import { userService } from "./users.service";


const createUser = async (req: Request, res: Response) => {
    try {

        const body = req.body;

        const result = await userService.createUserIntoDatabase(body);

        return sendResponse(res, 201, true, 'User registered successfully', result.rows[0]);

    } catch (err) {
        if (err instanceof Error) {
            return sendResponse(res, 500, false, 'Failed to create user!', undefined, err.message);
        }
        return sendResponse(res, 500, false, 'Failed to create user!', undefined, 'Unknown Error Occured!');
    }
}

const loginUser = async (req: Request, res: Response) => {
    try {

        const body = req.body;
        
        const result = await userService.loginUserFromDatabase(body);

        return sendResponse(res, 200, true, 'Login successful!', result)

    } catch (err) {
        if (err instanceof Error) {
            return sendResponse(res, 500, false, 'Failed to Login!', undefined, err.message);
        }
        return sendResponse(res, 500, false, 'Failed to Login!', undefined, 'Unknown Error Occured!');
    }
}

export const userController = {
    createUser,
    loginUser
}