const db = require('../config/database');

class Account {
    static async create(userId, name, balance = 0) {
        const [result] = await db.execute(
            'INSERT INTO accounts (user_id, name, balance) VALUES (?, ?, ?)',
            [userId, name, balance]
        );
        return { id: result.insertId };
    }

    static async findAllByUser(userId) {
        const [rows] = await db.execute(
            'SELECT id, name, balance, created_at FROM accounts WHERE user_id = ? ORDER BY created_at ASC',
            [userId]
        );
        return rows;
    }

    static async findByIdAndUser(id, userId) {
        const [rows] = await db.execute(
            'SELECT id, name, balance FROM accounts WHERE id = ? AND user_id = ?',
            [id, userId]
        );
        return rows[0] || null;
    }

    static async update(id, userId, name) {
        const [result] = await db.execute(
            'UPDATE accounts SET name = ? WHERE id = ? AND user_id = ?',
            [name, id, userId]
        );
        return result.affectedRows > 0;
    }

    static async delete(id, userId) {
        const [result] = await db.execute(
            'DELETE FROM accounts WHERE id = ? AND user_id = ?',
            [id, userId]
        );
        return result.affectedRows > 0;
    }

    // Called internally when a transaction is added/deleted
    static async updateBalance(id, amount, db_conn = db) {
        await db_conn.execute(
            'UPDATE accounts SET balance = balance + ? WHERE id = ?',
            [amount, id]
        );
    }
}

module.exports = Account;
