const express = require('express');

const router = express.Router();

const employeeController =
    require('../controllers/employee.controller');

const auth =
    require('../middleware/auth');

const admin =
    require('../middleware/admin');
const demoProtection = require('../middleware/demoProtection');

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
    demoProtection,
    employeeController.addEmployee
);

router.put(
    '/:id',
    auth,
    demoProtection,
    employeeController.updateEmployee
);

router.delete(
    '/:id',
    auth,
    admin,
    demoProtection,
    employeeController.deleteEmployee
);

module.exports = router;