import type { NextFunction, Request, Response } from "express";
import sendResponse from "../utility/sendResponse";

const gloabalErrorHandler = (err : any, req : Request, res : Response, next : NextFunction) => {
    return sendResponse(res, 500, false, err.message || 'Internal Server Error');
}

export default gloabalErrorHandler;