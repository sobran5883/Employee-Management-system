import { useAuth } from "../context/AuthContext"

function AdminDashboard() {
  const {user} = useAuth();
  return (
    <div>AdminDashboard {user.name}</div>
  )
}

export default AdminDashboard