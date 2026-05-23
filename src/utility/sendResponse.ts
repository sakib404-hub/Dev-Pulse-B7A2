import type { Response } from "express";
import type { IResponse } from "../types/response";

const sendResponse = <T>(res : Response, statusCode : number, success : boolean, message : string, data ?: T)=>{

    const response : IResponse<T> = {
        success,
        message,
    }

    if(data !== undefined){
        response.data = data;
    }

   return res.status(statusCode).json(response)
}

export default sendResponse;