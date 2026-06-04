import {
  createContext,
  useState
} from "react";

export const AuthContext = createContext();

export const AuthProvider = ({
  children
}) => {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const [employeeId,setEmployeeId] = useState(localStorage.getItem("employeeId"));

  return (

    <AuthContext.Provider
      value={{
        user,
        setUser,
        employeeId,
        setEmployeeId
      }}
    >

      {children}

    </AuthContext.Provider>

  );

};