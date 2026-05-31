const express = require('express');

const router = express.Router();

const employeeController =
    require('../controllers/employee.controller');

const auth =
    require('../middleware/auth');

const admin =
    require('../middleware/admin');

router.get(
    '/',
    auth,
    employeeController.getEmployees
);

router.get(
    '/:id',
    auth,
    employeeController.getEmployeeById
);

router.post(
    '/',
    auth,
    employeeController.addEmployee
);

router.put(
    '/:id',
    auth,
    employeeController.updateEmployee
);

router.delete(
    '/:id',
    auth,
    admin,
    employeeController.deleteEmployee
);

module.exports = router;