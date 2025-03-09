
import { useAuth } from '../../context/AuthProvider'
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Navbar() {
    const {user, logout} = useAuth()
    const handleLogout = () => {
      logout(); // Assuming this function handles the logout logic
      toast.success("Logged out successfully!")
      }
  return (
    <div className='flex items-center text-white justify-between h-12 bg-teal-600 px-10'>
        <p>welcome {user.name}</p>
        <button onClick={handleLogout} className='px-4 py-1 bg-teal-700'>Logout</button>
    </div>
  )
}

export default Navbar