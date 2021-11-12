import React from "react";
import { Link, useLocation, useHistory } from "react-router-dom";


const NavBar = (props) => {
  let location = useLocation();
  let history = useHistory();

  const handleLogOut = () => {
    localStorage.removeItem('token');
    history.push('/login')
    props.showAlert("Logged out successfully", 'success');
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{ height: "50px" }}>
      <Link className="navbar-brand" to="/">
        {props.title}
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item ">
            <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} to="/">
              Home <span className="sr-only"></span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link></li>
        </ul>
        {!localStorage.getItem("token") ? <form className="form-inline my-2 my-lg-0">
          <Link
            className="btn btn-outline-primary my-2 text-white"
            role="button" to='/login'
          >
            Log In
          </Link>
          <Link
            className="btn btn-outline-primary text-white mx-2 my-2"
            role="button" to='/signup'
          >
            Sign Up
          </Link>
        </form> : <button className="btn btn-outline-primary text-white my-2" onClick={handleLogOut}>Log Out</button>}
      </div>
    </nav>
  );
}

export default NavBar;