import axios from "axios";
import { useState, createContext, useContext, useEffect } from "react";

// Create a User Context
const UserContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const verifyUser = async () => {
        try {
          const token = localStorage.getItem("token");
          console.log("Token from localStorage:", token);
    
          if (token) {
            const response = await axios.get("http://localhost:5000/api/auth/verify", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
    
            console.log("Response from verify API:", response.data);
            if (response.data.success) {
              setUser(response.data.user);
            } else {
              setUser(null);
            }
          } else {
            setUser(null);
          }
        } catch (error) {
          console.error("Error in verifyUser:", error.response?.data || error.message);
          setUser(null);
        } finally {
          setLoading(false);
        }
      };
    
      verifyUser();
    }, []);
    
    const login = (user) => {
        setUser(user);
        if (user.token) {
            localStorage.setItem("token", user.token);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("token");
    };

    return (
        <UserContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom Hook for Consuming Auth Context
export const useAuth = () => useContext(UserContext);

export default AuthProvider;
