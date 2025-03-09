const chartData = {
    options: {
      chart: {
        id: "bar-chart",
      },
      xaxis: {
        categories: ["Customers", "Admins"],
      },
      title: {
        text: "Users Overview",
        align: "center",
      },
      colors: ["#008FFB", "#FF4560"],
      dataLabels: {
        enabled: true,
      },
    },
    series: [
      {
        name: "Users",
        data: [13, 5], // Replace with dynamic data if needed
      },
    ],
  };
  
  export default chartData;
  