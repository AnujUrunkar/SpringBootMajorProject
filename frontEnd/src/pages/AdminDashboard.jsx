
//Old My Working

// import React from "react";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";

// const AdminDashboard = () => {
//   const users = [
//     { id: 1, name: "Alice", urls: 5 },
//     { id: 2, name: "Bob", urls: 3 },
//   ];

//   return (
//     <>
//       {/* <Navbar type="admin" /> */}
//       <div className="container mt-4">
//         <h1>Admin Dashboard</h1>
//         <div className="list-group">
//           {users.map((user) => (
//             <div key={user.id} className="list-group-item bg-dark text-white">
//               <strong>{user.name}</strong> - {user.urls} URLs
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* <Footer /> */}
//     </>
//   );
// };

// export default AdminDashboard;




//Chinmay



// import React, { useEffect, useState } from "react";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { useAuth } from "../context/AuthContext";

// const AdminDashboard = () => {
//   const navigate = useNavigate();
//   const { authState } = useAuth();
//   const [listOfWebsites, setListOfWebsites] = useState([]);

//   function takeToMonitorPage(id, url) {
//     navigate(`/monitor/${id}?url=${encodeURIComponent(url)}`);
//   }

//   async function fetchAllWebsites() {
//     try {
//       const response = await axios.get("http://localhost:8080/admin/all");
  
//       if (response.status === 200) {
//         console.log("Fetched Users:", response.data); // Debugging line
//         setListOfWebsites(response.data);
//       } else if (response.status === 403) {
//         alert("Unauthorized access");
//         console.log("Unauthorized");
//       }
//     } catch (error) {
//       console.error("Error fetching websites:", error);
//     }
//   }
  

//   async function deleteWebsite(id) {
//     try {
//       const response = await axios.delete(`http://localhost:8080/admin/${id}`);

//       if (response.status === 200) {
//         alert("Website deleted successfully!");
//         setListOfWebsites(listOfWebsites.filter((website) => website.id !== id));
//       }
//     } catch (error) {
//       console.log("Error deleting website:", error);
//     }
//   }

//   useEffect(() => {
//     fetchAllWebsites();
//   },[]);
//   console.log(listOfWebsites);
//   return (
//     <>
//       <div className="container mt-4">
//         <h1>Admin Dashboard</h1>
//         <div 
//           className="table-responsive mt-3" 
//           style={{ maxHeight: "400px", overflowY: "auto", border: "1px solid #ddd", borderRadius: "8px" }}
//         >
//           <table className="table table-bordered table-hover mb-0">
//             <thead className="thead-dark" style={{ position: "sticky", top: 0, background: "#343a40", color: "white", zIndex: 2 }}>
//               <tr>
//                 <th>User ID</th>
//                 <th>User Name</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {listOfWebsites.length === 0 ? (
//                 <tr>
//                   <td colSpan="3" className="text-center">No websites found.</td>
//                 </tr>
//               ) : (
//                 listOfWebsites.map((website) => (
//                   <tr key={website.id}>
//                     <td>{website.userId || "N/A"}</td>
//                     {/* <td 
//                       style={{ cursor: "pointer", color: "blue" }} 
//                       onClick={() => takeToMonitorPage(website.id, website.url)}
//                     >
//                       {website.url || "No URL"}
//                     </td> */}
//                     <td>
//                       <button className="btn btn-danger btn-sm" onClick={() => deleteWebsite(website.id)}>
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </>
//   );
  
// };

// export default AdminDashboard;

import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { authState } = useAuth();
  const [listOfUsers, setListOfUsers] = useState([]);

  async function fetchAllUsers() {
    try {
      const response = await axios.get("http://localhost:8080/admin/all");
  
      if (response.status === 200) {
        console.log("Fetched Users:", response.data); // Debugging line
        setListOfUsers(response.data);
      } else if (response.status === 403) {
        alert("Unauthorized access");
        console.log("Unauthorized");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }
  
  async function deleteUser(id) {
    try {
      const response = await axios.delete(`http://localhost:8080/admin/${id}`);
      if (response.status === 200) {
        alert("User deleted successfully!");
        setListOfUsers(listOfUsers.filter((user) => user.id !== id));
      }
    } catch (error) {
      console.log("Error deleting user:", error);
    }
  }

  useEffect(() => {
    fetchAllUsers();
  }, []);

  console.log(listOfUsers);

  return (
    <>
      <div className="container mt-4">
        <h1>Admin Dashboard</h1>
        <div 
          className="table-responsive mt-3" 
          style={{ maxHeight: "400px", overflowY: "auto", border: "1px solid #ddd", borderRadius: "8px" }}
        >
          <table className="table table-bordered table-hover mb-0">
            <thead className="thead-dark" style={{ position: "sticky", top: 0, background: "#343a40", color: "white", zIndex: 2 }}>
              <tr>
                <th>User ID</th>
                <th>Username</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {listOfUsers.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center">No users found.</td>
                </tr>
              ) : (
                listOfUsers.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id || "N/A"}</td>
                    <td>{`${user.firstName || "Unknown"} ${user.lastName || ""}`.trim()}</td>
                    <td>
                      <button className="btn btn-danger btn-sm" onClick={() => deleteUser(user.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;


