const db = require("../config/db");

exports.getStats = (req, res) => {

  const queries = {
    employees:
      "SELECT COUNT(*) AS count FROM employees",

    admins:
      "SELECT COUNT(*) AS count FROM users WHERE role='admin'",

    users:
      "SELECT COUNT(*) AS count FROM users",

    departments:
      "SELECT COUNT(DISTINCT department) AS count FROM employees"
  };

  db.query(
    queries.employees,
    (err, employeeResult) => {

      if (err) {
        return res.status(500).json(err);
      }

      db.query(
        queries.admins,
        (err, adminResult) => {

          if (err) {
            return res.status(500).json(err);
          }

          db.query(
            queries.users,
            (err, userResult) => {

              if (err) {
                return res.status(500).json(err);
              }

              db.query(
                queries.departments,
                (err, departmentResult) => {

                  if (err) {
                    return res.status(500).json(err);
                  }

                  res.status(200).json({

                    totalEmployees:
                      employeeResult[0].count,

                    totalAdmins:
                      adminResult[0].count,

                    totalUsers:
                      userResult[0].count,

                    totalDepartments:
                      departmentResult[0].count

                  });

                }
              );

            }
          );

        }
      );

    }
  );
};