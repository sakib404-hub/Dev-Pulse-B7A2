import { pool } from "../../database"
import type { IUser } from "./users.interface"
import bcrypt from "bcryptjs";

const createUserIntoDatabase = async(payLoad : IUser)=>{
    const {name, email, password, role} = payLoad;

    const hashedPassword = bcrypt.hashSync(password, 10);

    const result = await pool.query(`INSERT INTO users(name, email, password, role) VALUES($1, $2, $3, $4) RETURNING id, name, email, role, created_at, updated_at`, [name, email, hashedPassword, role]);

    return result;
}


export const userService = {
    createUserIntoDatabase
}