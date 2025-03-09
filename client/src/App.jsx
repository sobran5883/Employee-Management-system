import { Routes, Route, useLocation } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
import CustomerDashboard from "./pages/CustomerDashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Header from "./components/Header";
import PrivateRoutes from "./utils/PrivateRoutes";
import RoleBaseRoutes from "./utils/RoleBaseRoutes";
import AdminSummary from "./components/dashboard/AdminSummary";
// import AddCustomer from "./components/addCustomer/AddCustomer";
import Settings from "./components/settings/Settings";
import List from "./components/customer/List";
import Add from "./components/customer/Add";
import View from "./components/customer/View";
import Summery from './components/CustomerDashboard/Summery'
// import Profile from "./components/CustomerDashboard/Profile";
import View1 from "./components/customer/view1";
import LeaveList from "./components/leave/List";
import AddLeave from './components/leave/Add'
import Edit from "./components/customer/Edit";

function App() {
  const location = useLocation(); // Get the current location

  // Define routes where Header should appear
  const showHeaderRoutes = ["/", "/login", "/register"];
  const shouldShowHeader = showHeaderRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowHeader && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoutes>
              <RoleBaseRoutes requireRole={["admin"]}>
                <AdminDashboard />
              </RoleBaseRoutes>
            </PrivateRoutes>
          }
        >
          {/* Nested Routes for Admin Dashboard */}
          <Route index element={<AdminSummary />} />
          <Route path="customers" element={<List />} />
          <Route path="add-customer" element={<Add />} />
          <Route path="customers/:id" element={<View/>} />
          <Route path="customers/edit/:id" element={<Edit/>} />
          <Route path="settings" element={<Settings />} />
        </Route>


        <Route
          path="/customer-dashboard"
          element={
            <PrivateRoutes>
              <RoleBaseRoutes requireRole={["admin","customer"]}>
                <CustomerDashboard/>
              </RoleBaseRoutes>
            </PrivateRoutes>
          }
        >
          {/* Nested Routes for customer Dashboard */}
          <Route index element={<Summery/>}></Route>
          <Route path="profile/:id" element={<View1/>}></Route>
          <Route path="leaves" element={<LeaveList/>}></Route>
          <Route path="add-leave" element={<AddLeave/>}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
