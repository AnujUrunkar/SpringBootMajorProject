import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ type }) => {
  const logo = "/public/logo.jpg"; // Dummy Logo URL
  const[isVerified , setVerified] = useState(true);
  
  

  const renderLinks = () => {
    switch (type) {
      case "home":
        return (
          <>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/" className="nav-link active">Home</Link>
              </li>
              
              <li className="nav-item">
                <Link to="/user-dashboard" className="nav-link">User Dashboard</Link>
              </li>
              
              
            
              <li className="nav-item">
                <Link to="/admin-dashboard" className="nav-link">Admin Dashboard</Link>
              </li>
              
            
              <li className="nav-item">
                <Link to="/profile" className="nav-link">Profile</Link>
              </li>
              
              
              
              <li className="nav-item">
                  <Link to="/signin" className="nav-link">Sign In</Link>
              </li>
              
              
              
              <li className="nav-item">
                <Link to="/signup" className="nav-link">Sign Up</Link>
              </li>
              
              
              <li className="nav-item">
              <Link to="/aboutus" className="nav-link">About Us</Link>
              </li>
              <li className="nav-item">
              <Link to="/contactus" className="nav-link">Contact Us</Link>
              
              </li>
              
            </ul>
          </div>
        </div>
      </nav>  
          </>
        );
      case "user":
        return (
          <>
            <Link to="/profile" className="nav-link">Profile</Link>
            <Link to="/urlInputPage" className="nav-link">Add New URL</Link>
            <Link to="/signin" className="nav-link">Log Out</Link>
          </>
        );
      case "admin":
        return (
          <>
            {/* <Link to="/show-users" className="nav-link">Show Users</Link> */}
            
            <Link to="/" className="nav-link active">Home</Link>
            
            <Link to="/admin-dashboard" className="nav-link">Admin Dashboard</Link>
              
            {/* <Link to="/profile" className="nav-link">Profile</Link> */}
            {/* <Link to="/aboutus" className="nav-link">About Us</Link> */}
            {/* <Link to="/contactus" className="nav-link">Contact Us</Link> */}

            <Link to="/signin" className="nav-link">Log Out</Link>

          </>
        );
      default:
        return null;
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="logo" width="80" height="80" className="d-inline-block align-text-top" />
          
        </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            {renderLinks()}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
