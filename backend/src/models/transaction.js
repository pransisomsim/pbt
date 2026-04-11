const db = require('../config/database');
const Account = require('./account');

class Transaction {
    static async create(userId, data) {
        const { account_id, category_id, amount, type, transaction_date, note } = data;
        
        const connection = await db.getConnection();
        await connection.beginTransaction();
        
        try {
            const signedAmount = type === 'income' ? Math.abs(amount) : -Math.abs(amount);
            
            const [result] = await connection.execute(
                `INSERT INTO transactions 
                (user_id, account_id, category_id, amount, type, transaction_date, note) 
                VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [userId, account_id, category_id, signedAmount, type, transaction_date, note]
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
                SUM(CASE WHEN type = 'expense' THEN ABS(amount) ELSE 0 END) as total_expense
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
                SUM(ABS(t.amount)) as total
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
            // Get old transaction to reverse balance change
            const [oldTx] = await connection.execute(
                'SELECT account_id, amount FROM transactions WHERE id = ? AND user_id = ?',
                [id, userId]
            );
            
            if (!oldTx[0]) return false;
            
            // Update transaction
            const [result] = await connection.execute(
                `UPDATE transactions 
                 SET category_id = ?, note = ?, transaction_date = ?
                 WHERE id = ? AND user_id = ?`,
                [category_id, note, transaction_date, id, userId]
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
            // Get transaction details before deletion
            const [tx] = await connection.execute(
                'SELECT account_id, amount FROM transactions WHERE id = ? AND user_id = ?',
                [id, userId]
            );
            
            if (!tx[0]) return false;
            
            // Reverse the balance change
            await Account.updateBalance(tx[0].account_id, -tx[0].amount, connection);
            
            // Delete transaction
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
