import { useAuth } from "../context/AuthProvider"
import { Navigate } from "react-router-dom"

function PrivateRoutes({children}) {
    const {user, loading} = useAuth()
    if(loading){
        <div>Loading...</div>
    }
  return user ? children : <Navigate to='/login'/>

}  

export default PrivateRoutes

