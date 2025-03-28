const express = require('express')
const router = express.Router();
const LoginController = require('../controllers/loginController');

router.get('/', LoginController.getLoginPage);

module.exports = router;
