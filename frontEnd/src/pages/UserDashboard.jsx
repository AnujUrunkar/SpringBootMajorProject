import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";


const UserDashboard = () => {

  const navigate = useNavigate();
  const {authState} = useAuth();
  const [listOfWebsite , setListOfWebsite] = useState([]);

  function takeToMonitorPage(id, url) {

    navigate(`/monitor/${id}?url=${encodeURIComponent(url)}`);

  }

  async function fetchAllUserWebsite() {

    const id = authState.user.user_id;
    try {
      // {java}
      const response = await axios.get(`http://localhost:8080/users/website-dashboard/${id}`);
      // {dotnet}
      // const response = await axios.get(`http://localhost:5230/api/website/${id}`);

      if (response.status === 200 || response.status === 201) {
        console.log(response);
        setListOfWebsite(response.data);
      }

      if (response.status === 403) {
        alert("unauthorized access");
        console.log("unauthorized");
      }

    } catch (error) {
      console.log(error);
    }


  }

  useEffect(() => {

    fetchAllUserWebsite();

  },[]);

  const urls = [
    { id: 1, url: "https://www.cdac.in/", status: "Up" },
    { id: 2, url: "https://www.zomato.com/", status: "Down" },
  ];

  return (
    <>
      {/* <Navbar type="user" /> */}
      <div className="container mt-4">
        <h1>User Dashboard</h1>
        <div className="row">
          {listOfWebsite.map((url) => (
            <div onClick={() => takeToMonitorPage(url.id, url.url)} className="col-md-4 mb-3" key={url.id} >
              <div className="card bg-dark text-white">
                <div className="card-body">
                  <h5 id="monitor_h5" className="card-title">{url.url}</h5>
                  {/* <p id="monitor_p" className="card-text">Status: {url.status}</p> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default UserDashboard;
