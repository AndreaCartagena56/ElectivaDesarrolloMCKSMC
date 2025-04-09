const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController');
const loginController = require('../controllers/loginController');
const viewsController = require('../controllers/viewsController');
const reservaController = require('../controllers/reservaController');


// Ruta para la página de inicio
router.get('/', viewsController.getIndexPage);
router.get('/registro', registerController.getRegisterPage);
router.get('/contacts', loginController.getLoginPage);
router.get('/cook-book', viewsController.getCookBookPage);
router.get('/cuisine', viewsController.getCuisinePage);
router.get('/wine', reservaController.getWinePage);


router.post('/registro', registerController.register);
router.post('/contacts', loginController.login);
router.post('/wine', reservaController.registrarReserva);




module.exports = router;
