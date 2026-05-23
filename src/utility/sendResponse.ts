import type { Response } from "express";
import type { IResponse } from "../types/response";


const sendResponse = <T>(res : Response, statusCode : number, success : boolean, message : string, data ?: T, errors ? : unknown)=>{

    const response : IResponse<T> = {
        success,
        message,
    }
    //? checking if the data is not undefined therefore adding it to response
    if(data !== undefined){
        response.data = data;
    }

    //? checking if the error is not undefined therefore adding it to response
    if(errors !== undefined){
        response.errors = errors;
    }

   return res.status(statusCode).json(response)
}

export default sendResponse;