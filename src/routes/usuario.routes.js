const express = require('express')
const router = express.Router()
const usuarioController = require('../controllers/usuario.controller');
// Retrieve all employees
router.get('/user/all', usuarioController.findAll);
// Create a new employee
router.post('/user/create', usuarioController.create);
// Retrieve a single employee with id
router.get('/user/find/:id', usuarioController.findById);
// Reinicar servicios
router.get('/user/restart', usuarioController.restartServices);
module.exports = router