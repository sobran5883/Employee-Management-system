import { useAuth } from "../context/AuthProvider";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import AdminSidebar from '../components/dashboard/AdminSidebar'
import Navbar from "../components/dashboard/Navbar";
// import AdminSummary from "../components/dashboard/AdminSummary";

function AdminDashboard() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [loading, user, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex">
      <AdminSidebar/>
      <div className="flex-1 ml-64 bg-gray-100 h-fit min-h-screen">
        <Navbar/>
        <Outlet/>
      </div>
    </div>
  );
}

export default AdminDashboard;
