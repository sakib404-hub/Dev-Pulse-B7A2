import type { Request, Response } from "express";


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
    getAllIssues
}