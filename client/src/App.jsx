import {BrowserRouter, Routes, Route} from 'react-router-dom'
import AdminDashboard from './pages/AdminDashboard'
import EmployeeDashboard from './pages/EmployeeDashboard'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import Header from './components/Header'

function App() {

  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        {/* <Route path="/" element={<Navigate to="/admin-dashboard"/>}/> */}
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/admin-dashboard" element={<AdminDashboard to="/admin-dashboard"/>}/>
        <Route path="/employee-dashboard" element={<EmployeeDashboard to="/admin-dashboard"/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
