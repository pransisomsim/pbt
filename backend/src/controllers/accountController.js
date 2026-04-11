const Account = require('../models/account');

class AccountController {
    static async getAll(req, res) {
        try {
            const accounts = await Account.findAllByUser(req.userId);
            res.json({ accounts });
        } catch (err) {
            res.status(500).json({ error: 'Failed to fetch accounts' });
        }
    }

    static async create(req, res) {
        try {
            const { name, balance } = req.body;
            if (!name) return res.status(400).json({ error: 'Account name is required' });

            const account = await Account.create(req.userId, name, balance || 0);
            res.status(201).json({ message: 'Account created', accountId: account.id });
        } catch (err) {
            res.status(500).json({ error: 'Failed to create account' });
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
            res.status(500).json({ error: 'Failed to update account' });
        }
    }

    static async delete(req, res) {
        try {
            const deleted = await Account.delete(req.params.id, req.userId);
            if (!deleted) return res.status(404).json({ error: 'Account not found' });

            res.json({ message: 'Account deleted' });
        } catch (err) {
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
          res.status(500).json({ error: 'Failed to fetch account' });
      }
  }
}

module.exports = AccountController;
