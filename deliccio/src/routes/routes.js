const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');
const wineController = require('../controllers/wineController');
const viewsController = require('../controllers/viewsController');

router.get('/', loginController.getLoginPage);
router.get('/wine', wineController.getWinePage);
router.get('/contacts', viewsController.getContactsPage);
router.get('/cook-book', viewsController.getCookBookPage);
router.get('/cuisine', viewsController.getCuisinePage);
router.get('/registro', viewsController.getRegistroPage);

module.exports = router;
