const express = require('express')
const router = express.Router()
const reportController = require('../controllers/report.controller');
// Retrieve all employees
router.get('/report/all', reportController.findAll);
router.post('/report/pdf', reportController.generatePDF);
router.post('/report/excel', reportController.generateExcel);

module.exports = router
