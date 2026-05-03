
import mysql2 from 'mysql2/promise';

const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || ''
};

const dbName = process.env.DB_NAME || 'testdb';
let pool;

export async function initDatabase() {
    const adminConnection = await mysql2.createConnection(dbConfig);
    await adminConnection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
    await adminConnection.end();

    if (!pool) {
        pool = mysql2.createPool({
            ...dbConfig,
            database: dbName,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });
    }

    await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(150) NOT NULL UNIQUE
        )
    `);
}

export const db = {
    async query(sql, params = []) {
        if (!pool) {
            throw new Error('Database is not initialized. Call initDatabase() first.');
        }

        return pool.query(sql, params);
    }
};
