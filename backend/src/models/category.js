const db = require('../config/database');

class Category {
    static async findAllByUser(userId) {
        const [rows] = await db.execute(
            `SELECT id, name, type, user_id 
             FROM categories 
             WHERE user_id IS NULL OR user_id = ?
             ORDER BY type, name`,
            [userId]
        );
        return rows;
    }

    static async create(userId, name, type) {
        const [result] = await db.execute(
            'INSERT INTO categories (user_id, name, type) VALUES (?, ?, ?)',
            [userId, name, type]
        );
        return { id: result.insertId };
    }

    static async delete(id, userId) {
        const [result] = await db.execute(
            'DELETE FROM categories WHERE id = ? AND user_id = ?',
            [id, userId]
        );
        return result.affectedRows > 0;
    }
}

module.exports = Category;
