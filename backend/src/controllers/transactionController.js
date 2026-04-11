const Transaction = require('../models/transaction');

class TransactionController {
    static async getAll(req, res) {
        try {
            const { limit } = req.query;
            const transactions = await Transaction.findAllByUser(
                req.userId, 
                limit ? parseInt(limit) : null
            );
            res.json({ transactions });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to fetch transactions' });
        }
    }

    static async getMonthlySummary(req, res) {
        try {
            const now = new Date();
            const year = req.query.year || now.getFullYear();
            const month = req.query.month || now.getMonth() + 1;
            
            const summary = await Transaction.findMonthlySummary(req.userId, year, month);
            const categories = await Transaction.getCategoryBreakdown(req.userId, year, month);
            
            res.json({
                summary: {
                    income: parseFloat(summary.total_income || 0),
                    expense: parseFloat(summary.total_expense || 0),
                    net: parseFloat((summary.total_income || 0) - (summary.total_expense || 0))
                },
                categories: categories.map(c => ({
                    name: c.category_name,
                    value: parseFloat(c.total)
                }))
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to fetch monthly summary' });
        }
    }

    static async create(req, res) {
        try {
            const { account_id, category_id, amount, type, transaction_date, note } = req.body;
            
            if (!account_id || !category_id || !amount || !type || !transaction_date) {
                return res.status(400).json({ error: 'Missing required fields' });
            }
            
            const transaction = await Transaction.create(req.userId, {
                account_id,
                category_id,
                amount,
                type,
                transaction_date,
                note
            });
            
            res.status(201).json({ 
                message: 'Transaction created', 
                transactionId: transaction.id 
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to create transaction' });
        }
    }

    static async update(req, res) {
        try {
            const { category_id, note, transaction_date } = req.body;
            
            const updated = await Transaction.update(req.params.id, req.userId, {
                category_id,
                note,
                transaction_date
            });
            
            if (!updated) {
                return res.status(404).json({ error: 'Transaction not found' });
            }
            
            res.json({ message: 'Transaction updated' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to update transaction' });
        }
    }

    static async delete(req, res) {
        try {
            const deleted = await Transaction.delete(req.params.id, req.userId);
            
            if (!deleted) {
                return res.status(404).json({ error: 'Transaction not found' });
            }
            
            res.json({ message: 'Transaction deleted' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to delete transaction' });
        }
    }
}

module.exports = TransactionController;
