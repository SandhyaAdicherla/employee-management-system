require('dotenv').config();

const express = require('express');
const cors = require('cors');

require('./config/db');

const authRoutes = require('./routes/auth.routes');
const employeeRoutes = require('./routes/employee.routes');
const dashboardRoutes = require("./routes/dashboard.routes");
const activityRoutes = require("./routes/activity.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/employees', employeeRoutes);

app.use("/dashboard", dashboardRoutes);

app.use("/activity-logs",activityRoutes);

app.get('/', (req, res) => {
    res.send('Employee Management API Running');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});