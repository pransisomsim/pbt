// backend/src/models/transaction.js
const db = require('../config/database');
const Account = require('./account');

class Transaction {
    static async create(userId, data) {
        const { account_id, category_id, amount, type, transaction_date, note } = data;

        const connection = await db.getConnection();
        await connection.beginTransaction();

        try {
            // Store absolute (positive) amount to satisfy CHECK (amount > 0)
            const positiveAmount = Math.abs(amount);
            
            // Calculate signed amount for balance update
            const signedAmount = type === 'income' ? positiveAmount : -positiveAmount;

            const [result] = await connection.execute(
                `INSERT INTO transactions
                (user_id, account_id, category_id, amount, type, transaction_date, note)
                VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [userId, account_id, category_id, positiveAmount, type, transaction_date, note || null]
            );

            await Account.updateBalance(account_id, signedAmount, connection);

            await connection.commit();
            return { id: result.insertId };
        } catch (err) {
            await connection.rollback();
            throw err;
        } finally {
            connection.release();
        }
    }

    static async findAllByUser(userId, limit = null) {
        let query = `
            SELECT 
                t.id,
                t.amount,
                t.type,
                t.note,
                t.transaction_date,
                t.created_at,
                c.id as category_id,
                c.name as category_name,
                c.type as category_type,
                a.id as account_id,
                a.name as account_name
            FROM transactions t
            LEFT JOIN categories c ON t.category_id = c.id
            LEFT JOIN accounts a ON t.account_id = a.id
            WHERE t.user_id = ?
            ORDER BY t.transaction_date DESC, t.created_at DESC
        `;

        if (limit) {
            query += ` LIMIT ?`;
            const [rows] = await db.execute(query, [userId, limit]);
            return rows;
        }

        const [rows] = await db.execute(query, [userId]);
        return rows;
    }

    static async findMonthlySummary(userId, year, month) {
        const [rows] = await db.execute(
            `SELECT 
                SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) as total_income,
                SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) as total_expense
             FROM transactions 
             WHERE user_id = ? 
             AND YEAR(transaction_date) = ? 
             AND MONTH(transaction_date) = ?`,
            [userId, year, month]
        );
        return rows[0];
    }

    static async getCategoryBreakdown(userId, year, month) {
        const [rows] = await db.execute(
            `SELECT 
                c.name as category_name,
                SUM(t.amount) as total
             FROM transactions t
             JOIN categories c ON t.category_id = c.id
             WHERE t.user_id = ? 
             AND t.type = 'expense'
             AND YEAR(t.transaction_date) = ? 
             AND MONTH(t.transaction_date) = ?
             GROUP BY c.id, c.name
             ORDER BY total DESC
             LIMIT 5`,
            [userId, year, month]
        );
        return rows;
    }

    static async update(id, userId, data) {
        const { category_id, note, transaction_date } = data;
        const connection = await db.getConnection();
        await connection.beginTransaction();

        try {
            const [oldTx] = await connection.execute(
                'SELECT account_id, amount, type FROM transactions WHERE id = ? AND user_id = ?',
                [id, userId]
            );

            if (!oldTx[0]) return false;

            const [result] = await connection.execute(
                `UPDATE transactions 
                 SET category_id = ?, note = ?, transaction_date = ?
                 WHERE id = ? AND user_id = ?`,
                [category_id, note || null, transaction_date, id, userId]
            );

            await connection.commit();
            return result.affectedRows > 0;
        } catch (err) {
            await connection.rollback();
            throw err;
        } finally {
            connection.release();
        }
    }

    static async delete(id, userId) {
        const connection = await db.getConnection();
        await connection.beginTransaction();

        try {
            const [tx] = await connection.execute(
                'SELECT account_id, amount, type FROM transactions WHERE id = ? AND user_id = ?',
                [id, userId]
            );

            if (!tx[0]) return false;

            // Reverse the balance change - convert stored positive amount back to signed
            const signedAmount = tx[0].type === 'income' ? -tx[0].amount : tx[0].amount;
            await Account.updateBalance(tx[0].account_id, signedAmount, connection);

            const [result] = await connection.execute(
                'DELETE FROM transactions WHERE id = ? AND user_id = ?',
                [id, userId]
            );

            await connection.commit();
            return result.affectedRows > 0;
        } catch (err) {
            await connection.rollback();
            throw err;
        } finally {
            connection.release();
        }
    }
}

module.exports = Transaction;
