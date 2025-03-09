import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from "axios";

const LoginGraph = () => {
  const [chartOptions, setChartOptions] = useState({
    chart: {
      id: "login-bar-chart",
    },
    xaxis: {
      categories: [], // Dates will go here
    },
    title: {
      text: "Last 7 Days Login Activity",
      align: "center",
    },
    colors: ["#008FFB"],
    dataLabels: {
      enabled: true,
    },
  });

  const [chartSeries, setChartSeries] = useState([
    {
      name: "Logins",
      data: [], // Counts will go here
    },
  ]);

  // useEffect(() => {
  //   const fetchLast7DaysLogins = async () => {
  //     try {
  //       const token = localStorage.getItem("token"); // Get token from local storage or context
  //       const response = await axios.get("http://localhost:5000/api/customer/last7days", {
  //         headers: {
  //           Authorization: `Bearer ${token}`, // Include token in headers
  //         },
  //       });
  //       console.log("API Response:", response.data);
  //       if (response.data.success) {
  //         const categories = response.data.data.map((entry) => entry.date);
  //         const data = response.data.data.map((entry) => entry.count);
  
  //         setChartOptions((prevOptions) => ({
  //           ...prevOptions,
  //           xaxis: { ...prevOptions.xaxis, categories },
  //         }));
  //         setChartSeries([{ name: "Logins", data }]);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching last 7 days login data:", error);
  //     }
  //   };
  
  //   fetchLast7DaysLogins();
  // }, []);


  // dummy data
  useEffect(() => {
    const dummyData = [
      { date: "2025-01-18", count: 10 },
      { date: "2025-01-19", count: 7 },
      { date: "2025-01-20", count: 5 },
      { date: "2025-01-21", count: 15 },
      { date: "2025-01-22", count: 20 },
      { date: "2025-01-23", count: 25 },
      { date: "2025-01-24", count: 30 },
    ];
  
    const categories = dummyData.map((entry) => entry.date);
    const data = dummyData.map((entry) => entry.count);
  
    setChartOptions((prevOptions) => ({
      ...prevOptions,
      xaxis: { ...prevOptions.xaxis, categories },
    }));
    setChartSeries([{ name: "Logins", data }]);
  }, []);

  return (
    <div className="login-graph">
      <h2 className="text-center my-4"></h2>
      <Chart
        options={chartOptions}
        series={chartSeries}
        type="bar"
        height={300}
        width="100%"
      />
    </div>
  );
};

export default LoginGraph;
