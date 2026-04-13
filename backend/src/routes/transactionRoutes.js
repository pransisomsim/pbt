// backend/src/routes/transactionRoutes.js
const express = require('express');
const router = express.Router();
const TransactionController = require('../controllers/transactionController');
const authMiddleware = require('../middleware/auth');

// Apply auth middleware to all routes
router.use(authMiddleware);

// IMPORTANT: Order matters! Specific routes first
router.get('/summary', TransactionController.getMonthlySummary);
router.get('/', TransactionController.getAll);
router.post('/', TransactionController.create);
router.put('/:id', TransactionController.update);
router.delete('/:id', TransactionController.delete);

module.exports = router;
