import { pool } from "../../database";
import type { IIssues } from "./issues.interface";

const createIssues = async (payLoad: IIssues, reporter_id : string) => {
    const { title, description, type, status } = payLoad;

    const result = await pool.query(
            `INSERT INTO issues(title, description, type, status, reporter_id)
             VALUES($1, $2, $3, COALESCE($4, 'open'), $5)
             RETURNING *`,
            [title, description, type, status, reporter_id]
        );

    return result;
};

const getAllIssueFromDatabase = async (query: any) => {

    const { sort, type, status } = query;

    const values: any[] = [];

    let queryText = `SELECT * FROM issues`;

    let conditionIndex = 1;

    // filter by type
    if (type) {
        queryText += ` WHERE type = $${conditionIndex}`;
        values.push(type);
        conditionIndex++;
    }

    // filter by status
    if (status) {

        if (values.length > 0) {
            queryText += ` AND status = $${conditionIndex}`;
        } else {
            queryText += ` WHERE status = $${conditionIndex}`;
        }

        values.push(status);
        conditionIndex++;
    }

    // sorting
    if (sort === 'oldest') {
        queryText += ` ORDER BY created_at ASC`;
    } else {
        queryText += ` ORDER BY created_at DESC`;
    }

    // fetch all issues
    const issuesResult = await pool.query(queryText, values);

    const issues = issuesResult.rows;

    // if no issues found
    if (issues.length === 0) {
        return [];
    }

    // collect unique reporter ids
    const reporterIds = [
        ...new Set(
            issues.map(issue => issue.reporter_id)
        )
    ];

    // fetch reporters separately
    const reportersResult = await pool.query(
        `
        SELECT id, name, role
        FROM users
        WHERE id = ANY($1)
        `,
        [reporterIds]
    );

    const reporters = reportersResult.rows;

    // create reporter map for fast lookup
    const reporterMap = new Map();

    reporters.forEach(reporter => {
        reporterMap.set(reporter.id, reporter);
    });

    // attach reporter info to each issue
    const formattedIssues = issues.map(issue => ({
        id: issue.id,
        title: issue.title,
        description: issue.description,
        type: issue.type,
        status: issue.status,

        reporter: reporterMap.get(issue.reporter_id) || null,

        created_at: issue.created_at,
        updated_at: issue.updated_at
    }));

    return formattedIssues;
};

const getSingleIssueFromDb = async (id: string) => {

    // get issue
    const issueResult = await pool.query(
        `SELECT * FROM issues WHERE id = $1`,
        [id]
    );

    if (issueResult.rowCount === 0) {
        throw new Error('No Issue Found!');
    }

    const issue = issueResult.rows[0];

    // get reporter
    const reporterResult = await pool.query(
        `SELECT id, name, role
         FROM users
         WHERE id = $1`,
        [issue.reporter_id]
    );

    const reporter = reporterResult.rows[0];

    // combine response
    return {
        id: issue.id,
        title: issue.title,
        description: issue.description,
        type: issue.type,
        status: issue.status,

        reporter,

        created_at: issue.created_at,
        updated_at: issue.updated_at
    };
};

const updateIssue = async (id: string, payLoad: any) => {

    const { title, description, type, status } = payLoad;

    const result = await pool.query(
        `
        UPDATE issues
        SET
            title = COALESCE($1, title),
            description = COALESCE($2, description),
            type = COALESCE($3, type),
            status = COALESCE($4, status),
            updated_at = NOW()

        WHERE id = $5
        RETURNING *;
        `,
        [title, description, type, status, id]
    );

    return result;
};

const deleteIssueFromDatabase = async(id : string)=>{
    const result = await pool.query(`DELETE FROM issues WHERE id=$1 RETURNING *`, [id]);
    return result;
}


const issuesService = {
    createIssues,
    getAllIssueFromDatabase,
    getSingleIssueFromDb,
    updateIssue,
    deleteIssueFromDatabase
}

export default issuesService;