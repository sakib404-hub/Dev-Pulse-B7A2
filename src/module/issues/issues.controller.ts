import type { Request, Response } from "express";
import sendResponse from "../../utility/sendResponse";
import issuesService from "./issues.service";


const createIssue = async (req: Request, res: Response) => {
    try {
        const reporter_id = req.user.id;

        const body = req.body;
        const result = await issuesService.createIssues(body, reporter_id as string);

        return sendResponse(res, 201, true, 'Issue created successfully', result.rows[0]);

    } catch (err) {
        if (err instanceof Error) {
            return sendResponse(
                res,
                500,
                false,
                'Unexpected server or database error.',
                undefined, err.message
            );
        }
        return sendResponse(
            res,
            500,
            false,
            'Unexpected server or database error.',
            undefined,
            'Unknown Error Occured!'
        )
    }
}

const getAllIssues = async (req: Request, res: Response) => {
    try {
        const query = req.query;
        const result = await issuesService.getAllIssueFromDatabase(query);

        sendResponse(res, 200, true, 'Successfully Fetched All the Issues', result);

    } catch (err) {
        if (err instanceof Error) {
            return sendResponse(
                res,
                500,
                false,
                'Unexpected server or database error.',
                undefined, err.message
            );
        }
        return sendResponse(
            res,
            500,
            false,
            'Unexpected server or database error.',
            undefined,
            'Unknown Error Occured!'
        )
    }
}

const getSingleIssue = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const result = await issuesService.getSingleIssueFromDb(id as string)

        if (!result) {
            return sendResponse(res, 404, false, 'Requested resource does not exist!');
        }

        return sendResponse(res, 200, true, 'Issue Retrive Successfully!', result);
    } catch (err) {
        if (err instanceof Error) {
            return sendResponse(
                res,
                500,
                false,
                'Unexpected server or database error.',
                undefined, err.message
            );
        }
        return sendResponse(
            res,
            500,
            false,
            'Unexpected server or database error.',
            undefined,
            'Unknown Error Occured!'
        )
    }
}

const updateIssue = async (req: Request, res: Response) => {
    try {

        const { id } = req.params;
        const body = req.body;

        const result = await issuesService.updateIssue(id as string, body);

        if (result.rowCount === 0) {
            return sendResponse(
                res,
                404,
                false,
                'Issue not found'
            );
        }

        return sendResponse(
            res,
            200,
            true,
            'Issue updated successfully.',
            result.rows[0]
        );

    } catch (err) {
        if (err instanceof Error) {
            return sendResponse(
                res,
                500,
                false,
                'Unexpected server or database error.',
                undefined, err.message
            );
        }
        return sendResponse(
            res,
            500,
            false,
            'Unexpected server or database error.',
            undefined,
            'Unknown Error Occured!'
        )
    }
}

const deleteIssue = async (req: Request, res: Response) => {
    try {

        const { id } = req.params;

        const result = await issuesService.deleteIssueFromDatabase(id as string);

        if (result.rowCount === 0) {
            return sendResponse(res, 404, false, "Requested resource does not exist.");
        }

        return sendResponse(
            res,
            200,
            true,
            "Issue Deleted successfully."
        );

    } catch (err) {
        if (err instanceof Error) {
            return sendResponse(
                res,
                500,
                false,
                'Unexpected server or database error.',
                undefined, err.message
            );
        }
        return sendResponse(
            res,
            500,
            false,
            'Unexpected server or database error',
            undefined,
            'Unknown Error Occured!'
        )
    }
}

export const issuesController = {
    createIssue,
    getAllIssues,
    getSingleIssue,
    updateIssue,
    deleteIssue
}