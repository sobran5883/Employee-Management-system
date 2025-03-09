import { NavLink } from "react-router-dom";
import { FaTachometerAlt, FaUsers} from 'react-icons/fa';
import { TbHomeShare } from "react-icons/tb";
import { useAuth } from "../../context/AuthProvider";

function Sidebar() {
    const {user} = useAuth();
  return (
    <div className="bg-gray-800 text-white z-10 h-screen fixed left-0 bottom-0 space-y-2 w-64">
      <div className="bg-teal-600 h-12 flex items-center justify-center">
        <h1 className="text-2xl text-center">Customer MS</h1>
      </div>
      <div className="px-4">
        <NavLink
          end
          to='/customer-dashboard'
          className={({ isActive }) => `${isActive ? "bg-teal-500" : ""} flex items-center space-x-4 py-2.5 rounded hover:bg-teal-700 px-2 my-1`}
        >
          <FaTachometerAlt />
          <span>Dashboard</span>
        </NavLink>
        <NavLink
          to={`/customer-dashboard/profile/${user._id}`}
          className={({ isActive }) => `${isActive ? "bg-teal-500" : ""} flex items-center space-x-4 py-2.5 rounded hover:bg-teal-700 px-2 my-1`}
        >
          <FaUsers />
          <span>My Profile</span>
        </NavLink>
        <NavLink
          to='/customer-dashboard/leaves'
          className={({ isActive }) => `${isActive ? "bg-teal-500" : ""} flex items-center space-x-4 py-2.5 rounded hover:bg-teal-700 px-2 my-1`}
        >
          <TbHomeShare className="text-xl"/>
          <span>Leaves</span>
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;
