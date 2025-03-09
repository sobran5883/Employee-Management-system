// import { Component } from "react";
// import Chart from "react-apexcharts";
// import chartData from "./CustomerData";

// class BarChart extends Component {
//   constructor(props) {
//     super(props);
//     this.state = chartData;
//   }

//   render() {
//     return (
//       <div className="bar-chart">
//         <Chart
//           options={this.state.options}
//           series={this.state.series}
//           type="bar"
//           width="400"
//           height={400}
//         />
//       </div>
//     );
//   }
// }

// export default BarChart;


import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from "axios";

const BarChart = () => {
  const [chartData, setChartData] = useState({
    options: {
      chart: {
        id: "bar-chart",
      },
      xaxis: {
        categories: [], // Dynamic categories for dates
      },
      title: {
        text: "Last 7 Days Login Activity",
        align: "center",
      },
      colors: ["#008FFB"],
      dataLabels: {
        enabled: true,
      },
    },
    series: [
      {
        name: "Logins",
        data: [], // Dynamic login counts
      },
    ],
  });

  useEffect(() => {
    const fetchLoginData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/customers/api/last7days", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const loginData = response.data.data; // Assuming API response structure
        const categories = loginData.map((entry) => entry.date);
        const data = loginData.map((entry) => entry.count);

        // Update chart data
        setChartData((prevState) => ({
          ...prevState,
          options: {
            ...prevState.options,
            xaxis: { ...prevState.options.xaxis, categories },
          },
          series: [{ ...prevState.series[0], data }],
        }));
      } catch (error) {
        console.error("Error fetching login data:", error);
      }
    };

    fetchLoginData();
  }, []);

  return (
    <div className="bar-chart">
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

export default BarChart;
