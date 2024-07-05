import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext({
  isAuthenticated: false,
  email: "",
  id: "",
  login: (token) => {},
  logout: () => {},
});

function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setIsAuthenticated(true);
      const decoded = jwtDecode(token);
      setEmail(decoded.sub);
    }
  }, []);

  const login = (token, id) => {
    localStorage.setItem("access_token", token);
    setIsAuthenticated(true);
    const decoded = jwtDecode(token);
    setEmail(decoded.sub);
    setId(id);
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    setIsAuthenticated(false);
    setEmail("");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, email, login, logout, id }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };
export default AuthProvider;
