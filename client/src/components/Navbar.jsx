import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import LoggedinNavbar from "./LoggedinNavbar";
import LoggedOutNavbar from "./LoggedOutNavbar";

function Navbar() {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
        <Link className="navbar-brand" to="/">
          SELFCARES CRUD WITH AUTH
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          {isAuthenticated ? <LoggedinNavbar /> : <LoggedOutNavbar />}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
