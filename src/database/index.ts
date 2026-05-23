import { Pool } from 'pg'
import config from '../config/config'

const pool = new Pool({
    connectionString: config.connectionString
});


export const initDB = async () => {
    try {

        await pool.query(`
        CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,

        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role VARCHAR(50) DEFAULT 'contributor'
        CHECK(role IN ('contributor', 'maintainer')),

        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
         );
    `);

        await pool.query(`
        CREATE TABLE IF NOT EXISTS issues(
        id SERIAL PRIMARY KEY,

        title VARCHAR(150) NOT NULL,
        description TEXT NOT NULL
        CHECK(char_length(description) >= 20),

        type VARCHAR(100) NOT NULL
        CHECK(type IN ('bug', 'feature_request')),
        status VARCHAR(30) DEFAULT 'open'
        CHECK(status IN ('open', 'in_progress', 'resolved')),
        reporter_id INT NOT NULL,

        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
        );
    `);

    console.log(`Database is connected successfully!`);

    } catch (err: any) {
        if (err instanceof Error) {
            throw new Error(err.message)
        }
        throw new Error('Something went wrong while initializing Database!')
    }
}