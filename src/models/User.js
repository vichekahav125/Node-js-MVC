import { BaseModel } from './BaseModel.js';

export class User extends BaseModel {
    
    constructor(id, name, email) {
        super('users');
        this.id = id;
        this.name = name;
        this.email = email;
    }

    static async getAll() {
        return await this.query(`SELECT * FROM users`);
    }

    static async getById(id) {
        const rows = await this.query(`SELECT * FROM users WHERE id = ?`, [id]);
        return rows.length ? rows[0] : null;
    }

    static async create(name, email) {
        const result = await this.query(
            `INSERT INTO users (name, email) VALUES (?, ?)`,
            [name, email]
        );
        return new User(result.insertId, name, email);
    }

    static async update(id, name, email) {
        const result = await this.query(
            `UPDATE users SET name = ?, email = ? WHERE id = ?`,
            [name, email, id]
        );
        if (result.affectedRows === 0) return null;
        return new User(id, name, email);
    }

    static async delete(id) {
        const result = await this.query( `DELETE FROM users WHERE id = ?`, [id] );
        return result.affectedRows > 0;
    }
}