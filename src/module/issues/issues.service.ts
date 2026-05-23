import { pool } from "../../database";
import type { IIssues } from "./issues.interface";

const createIssues = async (payLoad: IIssues) => {
    const { title, description, type, status } = payLoad;

    const result = await pool.query(
            `INSERT INTO issues(title, description, type, status)
             VALUES($1, $2, $3, COALESCE($4, 'open'))
             RETURNING *`,
            [title, description, type, status]
        );

    return result;
};


const issuesService = {
    createIssues
}

export default issuesService;