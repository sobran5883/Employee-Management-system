
// import SummaryCard from "./SummaryCard";
import BarChart from "../charts/BarChart";
import LineChartComponent from "../charts/LineChart";
import ActiveStatus from '../charts/ActiveStatus'

function AdminSummary() {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Dashboard Overview</h1>
      <div className="p-10" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {/* Summary Cards */}
        {/* <div style={{ display: "flex", gap: "20px" }}>
          <SummaryCard text="Total Customers" number={13} />
          <SummaryCard text="Total Admins" number={5} />
        </div> */}

        {/* Bar Chart */}
        <div className="flex">
            <div className="flex">
              <BarChart />
              <LineChartComponent/>
              <ActiveStatus/>
            </div>
        </div>
      </div>
    </div>
  );
}

export default AdminSummary;
