const UserController = require('../controllers/userController');
const {authLimiter} = require('../middleware/rateLimiter')

const express = require('express');
const router = express.Router();

router.post('/register', UserController.register);
router.post('/login', authLimiter, UserController.login);

module.exports = router;
