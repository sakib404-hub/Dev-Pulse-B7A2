import config from "../../config/config";
import { pool } from "../../database"
import type { AuthInformation, IUser } from "./users.interface"
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'

const createUserIntoDatabase = async(payLoad : IUser)=>{
    const {name, email, password, role} = payLoad;

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(`INSERT INTO users(name, email, password, role) VALUES($1, $2, $3, $4) RETURNING id, name, email, role, created_at, updated_at`, [name, email, hashedPassword, role]);

    return result;
}

const loginUserFromDatabase = async(payLoad : AuthInformation)=>{
    const {email, password} = payLoad;

    //? checking if the user exist
    const result = await pool.query(`SELECT * FROM users WHERE email=$1`,[email]);

    //? checking if the user is found
    if(result.rowCount === 0){
        throw new Error('Invalid Email, no user exists with such mail');
    }
    const user = result.rows[0];

    //? now compare the password
    const isMatched = await bcrypt.compare(password, user.password);
    
    if(!isMatched){
        throw new Error('Invalid Password!');
    }
    delete result.rows[0].password;

    //? token generation

    const jwtPayLoad = {
        id : user.id,
        name : user.name,
        email : user.email,
        role : user.role,
        created_at : user.created_at,
        updated_at : user.updated_at
    };

    const accessToken = jwt.sign(jwtPayLoad, config.jwtSecret as string, {expiresIn : '1d'});

    return {token : accessToken, user}
}

export const userService = {
    createUserIntoDatabase,
    loginUserFromDatabase
}