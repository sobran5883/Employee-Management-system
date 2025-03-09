import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from "axios";

const AdminDashboard = () => {
  const [chartData, setChartData] = useState({
    series: [{ name: "Customers", data: [] }],
    options: {
      chart: { id: "customer-status" },
      xaxis: { categories: ["Working", "On Leave"] },
      title: { text: "Customer Status Overview", align: "center" },
      colors: ["#00C853", "#D50000"], // Colors for working and on leave
    },
  });

//   useEffect(() => {
//     setChartData((prev) => ({
//       ...prev,
//       series: [{ name: "Customers", data: [10, 5] }], // Dummy data
//     }));
//   }, []);

  useEffect(() => {
    const fetchCustomerStatus = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users/status");
        if (response.data.success) {
          setChartData((prev) => ({
            ...prev,
            series: [
              {
                name: "Customers",
                data: [response.data.data.working, response.data.data.leave], // Populate data from API response
              },
            ],
          }));
        }
      } catch (error) {
        console.error("Error fetching customer statuses:", error);
      }
    };

    fetchCustomerStatus();
  }, []);

  return (
    <div>
      <Chart options={chartData.options} series={chartData.series} type="bar" height="400" width="400" />
    </div>
  );
};

export default AdminDashboard;
