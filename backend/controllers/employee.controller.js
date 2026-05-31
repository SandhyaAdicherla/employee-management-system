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
        name,
        email,
        department,
        salary
    } = req.body;

    if (!name || !email || !department || !salary) {

        return res.status(400).json({
            message: 'All fields are required'
        });
    }

    const query = `
        INSERT INTO employees
        (name,email,department,salary)
        VALUES(?,?,?,?)
    `;

    db.query(
        query,
        [
            name,
            email,
            department,
            salary
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
        name,
        email,
        department,
        salary
    } = req.body;

    const query = `
        UPDATE employees
        SET
            name=?,
            email=?,
            department=?,
            salary=?
        WHERE id=?
    `;

    db.query(
        query,
        [
            name,
            email,
            department,
            salary,
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