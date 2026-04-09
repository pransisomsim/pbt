
const db = require('../config/database');

class User {
    static async create(name, email, password) {
        if (!name || !email || !password) {
            throw new Error('Name, email, and password are required');
        }
        
        const sql = `SELECT id FROM users WHERE email = ?`;
        const [rows] = await db.execute(sql, [email]);

        if (rows.length > 0) {
            throw new Error('Email already exists');
        }

        const [result] = await db.execute(
            'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
            [name, email, password]
        );
        return { id: result.insertId };
    }


    static async findByEmail(email) {
        const sql = `SELECT id, name, email, password FROM users WHERE email = ?`;
        const [user] = await db.execute(sql, [email]);

        if (user.length === 0) {
            throw new Error('User not found');
        }

        return {user: user[0]};
    }
}

module.exports = User;