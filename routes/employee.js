const express = require('express');
const employeeController = require('../controller/resume');
const router = express.Router();

router
    .get('/',employeeController.getAllResumes)
    .post('/add',employeeController.addEmployee)
    .post('/remove',employeeController.removeEmployee)

exports.router = router;