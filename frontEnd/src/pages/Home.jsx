import React from "react";
import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";

import {NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Home = () => {

  const {authState} = useAuth();
  console.log(authState);
  return (
    <>
      {/* <Navbar type="home" /> */}
      <div className="container">
      {/* Hero Section */}
      <div className="jumbotron bg-dark text-white text-center py-5">
        <h1 className="display-4">Welcome to upTime!</h1>
        <p className="lead">
          upTime helps you monitor your website's performance and uptime in real-time. Stay ahead with accurate
          performance data.
        </p>
        <hr className="my-4" />
        <p>
          Simply enter the URL of your website, and we’ll show you how well it’s performing, its uptime status, and
          response time.
        </p>
        {/* <NavLink className="btn btn-light btn-lg" to="/urlInputPage" role="button">Start Monitoring</NavLink> */}
        
          <NavLink to = "/urlInputPage"  className="btn btn-light btn-lg w-25">Start Monitoring</NavLink>
        
        
        {/* <a className="btn btn-light btn-lg" href="/urlInputPage" role="button">Start Monitoring</a> */}
      </div>

      {/* Features Section */}
      <div className="row text-center mt-5">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Real-Time Monitoring</h5>
              <p className="card-text">
                Track the performance and uptime of your website with live updates.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Custom Alerts</h5>
              <p className="card-text">
                Set custom alerts for downtime or performance issues and receive notifications immediately.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Detailed Analytics</h5>
              <p className="card-text">
                Get access to detailed performance reports to optimize your website's performance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
      
    </>
  );
};

export default Home;
