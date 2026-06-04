const db = require('../config/db');
const addActivityLog = require("../utils/activityLogger");

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
   const formattedDate =
  joining_date
    ? joining_date
        .split("T")[0]
    : null;
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
            formattedDate,
            location,
            work_mode,
            status
        ],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }
            addActivityLog("CREATE",`Employee ${name} added`);
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
    if (req.body.role === "employee") {

        if (
            req.body.employeeId != req.params.id
        ) {
            return res.status(403).json({
            message:
            "You can edit only your profile"
            });
        }

    }
    const formattedDate =
  joining_date
    ? joining_date
        .split("T")[0]
    : null;
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
            formattedDate,
            location,
            work_mode,
            status,
            id
        ],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            addActivityLog("UPDATE",`Employee ${name} updated`);
            res.status(200).json({
                message: 'Employee Updated Successfully'
            });

        }
    );

};

// Delete Employee
exports.deleteEmployee = (req, res) => {

    const { id } = req.params;

    const getEmployeeQuery =
    `
    SELECT name
    FROM employees
    WHERE id = ?
    `;

    db.query(
        getEmployeeQuery,
        [id],
        (err, employeeResult) => {

            if (err) {
                return res
                .status(500)
                .json(err);
            }

            if (
                employeeResult.length === 0
            ) {
                return res
                .status(404)
                .json({
                    message:
                    "Employee not found"
                });
            }

            const employeeName =
            employeeResult[0].name;

            const deleteQuery =
            `
            DELETE FROM employees
            WHERE id = ?
            `;

            db.query(
                deleteQuery,
                [id],
                (err, result) => {

                    if (err) {
                        return res
                        .status(500)
                        .json(err);
                    }

                    addActivityLog("DELETE",`Employee ${employeeName} deleted`);

                    res.status(200).json({
                        message:
                        "Employee Deleted Successfully"
                    });

                }
            );

        }
    );

};