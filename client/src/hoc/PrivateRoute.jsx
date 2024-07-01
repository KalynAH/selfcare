import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Route, Navigate } from "react-router-dom";

function PrivateRoute({ component: Component, ...rest }) {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Navigate to="/login" />
      }
    />
  );
}

export default PrivateRoute;
