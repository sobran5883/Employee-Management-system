import { useAuth } from "../context/AuthProvider"
import { Navigate } from "react-router-dom"

function RoleBaseRoutes({children, requireRole}) {
    const {user, loading} = useAuth()
    if(loading){
        <div>Loading...</div>
    }
    if(!requireRole.includes(user.role)){
        <Navigate to='/unauthorized'/>
    }
  return user ? children : <Navigate to='/login'/>

}  

export default RoleBaseRoutes