import { pool } from "../../database"
import type { IUser } from "./users.interface"

const createUserIntoDatabase = async(payLoad : IUser)=>{
    const {name, email, password, role} = payLoad;

    const result = await pool.query(`INSERT INTO users(name, email, password, role) VALUES($1, $2, $3, $4) RETURNING id, name, email, role, created_at, updated_at`, [name, email, password, role]);

    return result;
}


export const userService = {
    createUserIntoDatabase
}