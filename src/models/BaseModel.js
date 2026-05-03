import { db } from '../config/db.js';

export class BaseModel {

    static async query(sql, params = []) {
        try {
            const [rows] = await db.query(sql, params);
            return rows;
        } catch (error) {
            console.error('Database query error:', error);
            throw error;
        }
    }
}