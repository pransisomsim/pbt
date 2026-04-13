// backend/src/controllers/accountController.js
const Account = require('../models/account');

class AccountController {
    static async getAll(req, res) {
        try {
            console.log('AccountController.getAll - userId:', req.userId);
            const accounts = await Account.findAllByUser(req.userId);
            console.log('Accounts found:', accounts.length);
            res.json({ accounts });
        } catch (err) {
            console.error('AccountController.getAll error:', err);
            res.status(500).json({ 
                error: 'Failed to fetch accounts',
                details: err.message 
            });
        }
    }

    static async create(req, res) {
        try {
            const { name, balance } = req.body;
            console.log('AccountController.create - userId:', req.userId, 'name:', name);
            
            if (!name) return res.status(400).json({ error: 'Account name is required' });

            const account = await Account.create(req.userId, name, balance || 0);
            res.status(201).json({ message: 'Account created', accountId: account.id });
        } catch (err) {
            console.error('AccountController.create error:', err);
            res.status(500).json({ 
                error: 'Failed to create account',
                details: err.message 
            });
        }
    }

    static async update(req, res) {
        try {
            const { name } = req.body;
            if (!name) return res.status(400).json({ error: 'Account name is required' });

            const updated = await Account.update(req.params.id, req.userId, name);
            if (!updated) return res.status(404).json({ error: 'Account not found' });

            res.json({ message: 'Account updated' });
        } catch (err) {
            console.error('AccountController.update error:', err);
            res.status(500).json({ error: 'Failed to update account' });
        }
    }

    static async delete(req, res) {
        try {
            const deleted = await Account.delete(req.params.id, req.userId);
            if (!deleted) return res.status(404).json({ error: 'Account not found' });

            res.json({ message: 'Account deleted' });
        } catch (err) {
            console.error('AccountController.delete error:', err);
            res.status(500).json({ error: 'Failed to delete account' });
        }
    }
    
    static async getOne(req, res) {
        try {
            const account = await Account.findByIdAndUser(req.params.id, req.userId);
            if (!account) {
                return res.status(404).json({ error: 'Account not found' });
            }
            res.json({ account });
        } catch (err) {
            console.error('AccountController.getOne error:', err);
            res.status(500).json({ error: 'Failed to fetch account' });
        }
    }
}

module.exports = AccountController;
