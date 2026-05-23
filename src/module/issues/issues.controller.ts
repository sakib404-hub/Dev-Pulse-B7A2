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

const getAllIssues = async(req : Request, res : Response)=>{
   try{
        const result = await issuesService.getAllIssueFromDatabase();

        if(result.rowCount === 0){
            return sendResponse(res, 200, true, 'No Issues found!', undefined);
        }

        sendResponse(res, 200,true, 'Successfully Fetched All the Issues', result.rows);

    }catch(err){
        if(err instanceof Error){
            return sendResponse(
                res, 
                500, 
                false,
                'Failed to retrive Issue!',
                undefined, err.message
            );
        }
        return sendResponse(
            res,
            500, 
            false, 
            'Failed to retrive Issue',
            undefined,
            'Unknown Error Occured!'
        )
    }
}

export const issuesController = {
    createIssue,
    getAllIssues
}