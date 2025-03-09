import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from "axios";

const UserRolesBarChart = () => {
  const [chartData, setChartData] = useState({
    options: {
      chart: {
        id: "user-roles-bar-chart",
      },
      xaxis: {
        categories: ["Customers", "Admins"], // Static categories for roles
      },
      title: {
        text: "Users by Role",
        align: "center",
      },
      colors: ["#008FFB", "#FF4560"], // Different colors for each role
      dataLabels: {
        enabled: true,
      },
    },
    series: [
      {
        name: "Users",
        data: [], // Dynamic data for user counts
      },
    ],
  });

  useEffect(() => {
    const fetchUserRoleData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users/count-by-role", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const { customers, admins } = response.data.data;

        // Update chart data with fetched counts
        setChartData((prevState) => ({
          ...prevState,
          series: [{ ...prevState.series[0], data: [customers, admins] }],
        }));
      } catch (error) {
        console.error("Error fetching user role data:", error);
      }
    };

    fetchUserRoleData();
  }, []);

  return (
    <div className="user-roles-bar-chart">
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="bar"
        width="400"
        height={400}
      />
    </div>
  );
};

export default UserRolesBarChart;
