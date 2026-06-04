const db = require("../config/db");

exports.getActivityLogs =
(req, res) => {

    const query = `
        SELECT *
        FROM activity_logs
        ORDER BY created_at DESC
        LIMIT 10
    `;

    db.query(
        query,
        (err, result) => {

            if (err) {
                return res
                .status(500)
                .json(err);
            }

            res.status(200)
            .json(result);

        }
    );

};