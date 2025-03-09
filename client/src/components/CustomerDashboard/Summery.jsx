
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { useAuth } from "../../context/AuthProvider";
import SevenDays from '../charts/SevenDayhistory'
import axios from "axios";
import { toast } from "react-toastify";

const SummaryCard = () => {
  const { user } = useAuth();
  const [status, setStatus] = useState(user.status || "on leave");

  const updateStatus = async (newStatus) => {
    try {
      await axios.post("http://localhost:5000/api/customer/update-status", {
        userId: user._id,
        status: newStatus,
      });
      setStatus(newStatus);
      toast.success(`Status updated to "${newStatus}"`);
    } catch (error) {
      toast.error("Failed to update status");
      console.error(error);
    }
  };

  return (
    <div className="p-8">
      <div className="rounded flex bg-white justify-between items-center pr-4">
        <div className="flex">
          <div className="text-3xl flex justify-center items-center bg-teal-600 text-white px-4">
            <FaUser />
          </div>
          <div className="pl-4 py-1">
            <p className="text-lg font-semibold">Welcome Back</p>
            <p className="text-xl font-bold">{user.name}</p>
          </div>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => updateStatus("working")}
            className={`border px-2 py-1 rounded-md text-white ${
              status === "working" ? "bg-green-700" : "bg-gray-400 hover:bg-green-700"
            }`}
          >
            Working
          </button>
          <button
            onClick={() => updateStatus("on leave")}
            className={`border px-2 py-1 rounded-md text-white ${
              status === "on leave" ? "bg-red-700" : "bg-gray-400 hover:bg-red-700"
            }`}
          >
            On Leave
          </button>
        </div>
      </div>      
      <div>
        <SevenDays />
      </div>
    </div>
  );
};

export default SummaryCard;

