const express = require('express')
const router = express.Router()
const controlController = require('../controllers/control.controller');
// Retrieve all employees
//router.get('/control/all', usuarioController.findAll);
// Create a new employee
router.post('/control/create', controlController.create);
module.exports = router