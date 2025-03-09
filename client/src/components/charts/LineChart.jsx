import { useEffect, useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import axios from "axios";

const LineChartComponent = () => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        // Fetch data from the backend
        const fetchChartData = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/auth/analytics/visits"); // Replace with your API endpoint
                if (response.data.success) {
                    setChartData(response.data.data);
                }
            } catch (error) {
                console.error("Error fetching chart data:", error.message);
            }
        };

        fetchChartData();
    }, []);

    return (
        <div style={{ width: "100%", height: 400 }}>
            <ResponsiveContainer>
                <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="visits" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default LineChartComponent;
