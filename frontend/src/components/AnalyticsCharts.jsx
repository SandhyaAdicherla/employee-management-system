import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell
} from "recharts";

function AnalyticsCharts({ employees }) {

  if (!employees.length) {
    return null;
  }

  const departmentData = Object.entries(
    employees.reduce((acc, employee) => {

      const department =
        employee.department || "Others";

      acc[department] =
        (acc[department] || 0) + 1;

      return acc;

    }, {})
  ).map(([name, count]) => ({
    name,
    count
  }));

  const workModeData = [
    {
      name: "Remote",
      value: employees.filter(
        employee =>
          employee.work_mode === "Remote"
      ).length
    },
    {
      name: "Hybrid",
      value: employees.filter(
        employee =>
          employee.work_mode === "Hybrid"
      ).length
    },
    {
      name: "Onsite",
      value: employees.filter(
        employee =>
          employee.work_mode === "Onsite"
      ).length
    }
  ];

  const statusData = [
    {
      name: "Active",
      value: employees.filter(
        employee =>
          employee.status === "Active"
      ).length
    },
    {
      name: "Resigned",
      value: employees.filter(
        employee =>
          employee.status === "Resigned"
      ).length
    }
  ];

  const COLORS = [
    "#4F46E5",
    "#10B981",
    "#F59E0B"
  ];

  return (

    <div className="analytics-grid">

      <div className="chart-card">

        <h3>
          Employees By Department
        </h3>

        <ResponsiveContainer
          width="100%"
          height={280}
        >

          <BarChart
            data={departmentData}
          >

            <XAxis
              dataKey="name"
            />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="count"
              fill="#4F46E5"
              radius={[6, 6, 0, 0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

      <div className="chart-card">

        <h3>
          Work Mode Distribution
        </h3>

        <ResponsiveContainer
          width="100%"
          height={280}
        >

          <PieChart>

            <Pie
              data={workModeData}
              dataKey="value"
              outerRadius={90}
              label
            >

              {workModeData.map(
                (item, index) => (

                  <Cell
                    key={index}
                    fill={
                      COLORS[
                        index %
                        COLORS.length
                      ]
                    }
                  />

                )
              )}

            </Pie>

            <Tooltip />

          </PieChart>

        </ResponsiveContainer>

      </div>

      <div className="chart-card">

        <h3>
          Employee Status
        </h3>

        <ResponsiveContainer
          width="100%"
          height={280}
        >

          <PieChart>

            <Pie
              data={statusData}
              dataKey="value"
              innerRadius={55}
              outerRadius={90}
              label
            >

              <Cell fill="#10B981" />
              <Cell fill="#EF4444" />

            </Pie>

            <Tooltip />

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>

  );

}

export default AnalyticsCharts;