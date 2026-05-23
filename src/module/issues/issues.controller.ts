import type { Request, Response } from "express";
import sendResponse from "../../utility/sendResponse";
import issuesService from "./issues.service";


const createIssue = async(req : Request, res : Response)=>{
    try{
        const body = req.body;
        const result = await issuesService.createIssues(body);

        return sendResponse(res, 201, true, 'Issue created successfully', result.rows[0]);

    }catch(err){
        if(err instanceof Error){
            return sendResponse(
                res, 
                500, 
                false,
                'Failed to create Issue!',
                undefined, err.message
            );
        }
        return sendResponse(
            res,
            500, 
            false, 
            'Failed to create Issue',
            undefined,
            'Unknown Error Occured!'
        )
    }
}

const getAllIssues = (req : Request, res : Response)=>{
    try{
        res.status(200).json({
            success : true,
            message : 'you will get all the issues from here!'
        })
    }catch(err : any){

    }
}

export const issuesController = {
    createIssue,
    getAllIssues
}