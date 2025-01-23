// import { useState, createContext, useContext } from "react";

// const userContext = createContext();

// const authContext=({Children})=>{
//     const [user, setUser] = useState(null)

//     const login=()=>{
//         setUser(user)
//     }
//     const logout = () =>{
//         setUser(null)
//         localStorage.removeItem("token")
//     }

//     return(
//         <userContext.Provider value={{user,login, logout}}>
//             {Children}
//         </userContext.Provider>
//     )
// }

// export const useAuth = () => useContext(userContext)
// export default authContext

import { useState, createContext, useContext } from "react";

const UserContext = createContext();

const AuthContext = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem("token", userData.token); // Assuming userData contains a token
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("token");
    };

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useAuth = () => useContext(UserContext);
export default AuthContext;
