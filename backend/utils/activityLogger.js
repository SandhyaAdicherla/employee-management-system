const db = require("../config/db");

const cleanOldLogs = () => {

  db.query(`
    DELETE FROM activity_logs
    WHERE id NOT IN (
      SELECT id
      FROM (
        SELECT id
        FROM activity_logs
        ORDER BY id DESC
        LIMIT 50
      ) temp
    )
  `);

};

const addActivityLog = (
  action,
  description
) => {

  db.query(
    `
    INSERT INTO activity_logs
    (action, description)
    VALUES (?, ?)
    `,
    [action, description],
    (err) => {

      if (err) {
        console.log(
          "Activity Log Error:",
          err
        );
        return;
      }

      cleanOldLogs();

    }
  );

};

module.exports = addActivityLog;