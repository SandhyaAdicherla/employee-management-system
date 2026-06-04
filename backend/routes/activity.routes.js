const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");

const activityController = require("../controllers/activity.controller");

router.get(
    "/",
    auth,
    activityController.getActivityLogs
);

module.exports = router;