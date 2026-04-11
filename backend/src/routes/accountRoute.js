const express = require('express');
const router = express.Router();
const AccountController = require('../controllers/accountController');
const authenticate = require('../middleware/auth'); // your existing auth middleware

router.use(authenticate); // protect all account routes

router.get('/',        AccountController.getAll);
router.post('/',       AccountController.create);
router.put('/:id',     AccountController.update);
router.delete('/:id',  AccountController.delete);

module.exports = router;
