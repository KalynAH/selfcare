import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Navigate } from "react-router-dom";

function WithAuth(Component) {
  return (props) => {
    const { isAuthenticated } = useContext(AuthContext);
    if (!isAuthenticated) {
      return <Navigate to="/login?message=unauthorized" />;
    }
    return <Component {...props} />;
  };
}
export default WithAuth;
