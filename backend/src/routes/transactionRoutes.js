const express = require('express');
const router = express.Router();
const TransactionController = require('../controllers/transactionController');
const authenticate = require('../middleware/auth');

router.use(authenticate);

router.get('/', TransactionController.getAll);
router.get('/monthly-summary', TransactionController.getMonthlySummary);
router.post('/', TransactionController.create);
router.put('/:id', TransactionController.update);
router.delete('/:id', TransactionController.delete);

module.exports = router;
