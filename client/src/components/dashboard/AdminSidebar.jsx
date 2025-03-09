import { NavLink } from "react-router-dom";
import { FaTachometerAlt, FaUsers, FaCog } from 'react-icons/fa';

function AdminSidebar() {
  return (
    <div className="bg-gray-800 text-white z-10 h-screen fixed left-0 bottom-0 space-y-2 w-64">
      <div className="bg-teal-600 h-12 flex items-center justify-center">
        <h1 className="text-2xl text-center">Customer MS</h1>
      </div>
      <div className="px-4">
        <NavLink
          end
          to='/admin-dashboard'
          className={({ isActive }) => `${isActive ? "bg-teal-500" : ""} flex items-center space-x-4 py-2.5 rounded hover:bg-teal-700 px-2 my-1`}
        >
          <FaTachometerAlt />
          <span>Dashboard</span>
        </NavLink>
        <NavLink
          to='/admin-dashboard/customers'
          className={({ isActive }) => `${isActive ? "bg-teal-500" : ""} flex items-center space-x-4 py-2.5 rounded hover:bg-teal-700 px-2 my-1`}
        >
          <FaUsers />
          <span>Customers</span>
        </NavLink>
        <NavLink
          to='/admin-dashboard/settings'
          className={({ isActive }) => `${isActive ? "bg-teal-500" : ""} flex items-center space-x-4 py-2.5 rounded hover:bg-teal-700 px-2 my-1`}
        >
          <FaCog />
          <span>Settings</span>
        </NavLink>
      </div>
    </div>
  );
}

export default AdminSidebar;
