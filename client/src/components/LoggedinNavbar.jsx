import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

function LoggedinNavbar() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/login?message=logout-successful");
  };
  return (
    <ul className="navbar-nav ms-auto">
      <li className="nav-item">
        <NavLink className="nav-link" to="/selfcares" end>
          All Selfcares
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/selfcares/new" end>
          Add Selfcare
        </NavLink>
      </li>
      <li className="nav-item">
        <button
          onClick={handleLogout}
          type="button"
          className="btn btn-outline-secondary"
        >
          Logout
        </button>
      </li>
    </ul>
  );
}
export default LoggedinNavbar;
