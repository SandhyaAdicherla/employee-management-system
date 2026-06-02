const db = require('../config/db');

// Get All Employees
exports.getEmployees = (req, res) => {

    const query = 'SELECT * FROM employees';

    db.query(query, (err, results) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.status(200).json(results);
    });
};

// Get Employee By Id
exports.getEmployeeById = (req, res) => {

    const { id } = req.params;

    const query =
        'SELECT * FROM employees WHERE id=?';

    db.query(query, [id], (err, results) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.status(200).json(results);
    });
};

// Add Employee
exports.addEmployee = (req, res) => {

    const {
        employee_code,
        name,
        email,
        designation,
        department,
        manager,
        salary,
        joining_date,
        location,
        work_mode,
        status
    } = req.body;

    if (
        !employee_code ||
        !name ||
        !email ||
        !designation ||
        !department ||
        !salary
    ) {

        return res.status(400).json({
            message: 'Required fields are missing'
        });

    }

    const query = `
        INSERT INTO employees
        (
            employee_code,
            name,
            email,
            designation,
            department,
            manager,
            salary,
            joining_date,
            location,
            work_mode,
            status
        )
        VALUES (?,?,?,?,?,?,?,?,?,?,?)
    `;

    db.query(
        query,
        [
            employee_code,
            name,
            email,
            designation,
            department,
            manager,
            salary,
            joining_date,
            location,
            work_mode,
            status
        ],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.status(201).json({
                message: 'Employee Added Successfully',
                employeeId: result.insertId
            });

        }
    );

};

// Update Employee
exports.updateEmployee = (req, res) => {

    const { id } = req.params;

    const {
        employee_code,
        name,
        email,
        designation,
        department,
        manager,
        salary,
        joining_date,
        location,
        work_mode,
        status
    } = req.body;

    const query = `
        UPDATE employees
        SET
            employee_code=?,
            name=?,
            email=?,
            designation=?,
            department=?,
            manager=?,
            salary=?,
            joining_date=?,
            location=?,
            work_mode=?,
            status=?
        WHERE id=?
    `;

    db.query(
        query,
        [
            employee_code,
            name,
            email,
            designation,
            department,
            manager,
            salary,
            joining_date,
            location,
            work_mode,
            status,
            id
        ],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.status(200).json({
                message: 'Employee Updated Successfully'
            });

        }
    );

};

// Delete Employee
exports.deleteEmployee = (req, res) => {

    const { id } = req.params;

    const query =
        'DELETE FROM employees WHERE id=?';

    db.query(query, [id], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.status(200).json({
            message: 'Employee Deleted Successfully'
        });
    });
};