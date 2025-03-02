// import React, { useEffect } from "react";
// import Navbar from "./Navbar";
// import { useAuth } from "../context/AuthContext";
// import axios from "../service/axiosSetUp.js";

// const Profile = () => {


//   const {authState} = useAuth() ;

//   async function fetchUserDetails (){


//     try{

//       console.log("inthe fetchUserDetails" , authState);
//       const id = authState.user.user_id ;
//       const response = await axios.get(`http://localhost:8080/users/profile/${id}`) ;

//       console.log(response);
//       if(response.status === 201){
//         console.log("sucessfull resp recive");
//         console.log(response) ;
//       }
  
  
//       if(response.status === 403){
//         console.log("Forbiden errr");
//         console.log(response);
//       }

//     }catch(err){
//       // console.log();
//       console.log( " err " , err);
//     }
   


//   }

//   useEffect(()=>{

//     fetchUserDetails() ;
    
//   } , []) ;
//   const urls = [
//     { id: 1, url: "https://example.com", status: "Up", responseTime: "200ms" },
//     { id: 2, url: "https://testsite.com", status: "Down", responseTime: "N/A" },
//   ];

//   return (
//     <>
//       {/* <Navbar type="user" /> */}
//       <div className="container mt-4">
//         <h1>User Profile</h1>
//         <h3>Registered URLs</h3>
//         <div className="list-group">
//           {urls.map((url) => (
//             <div key={url.id} className="list-group-item">
//               <strong>{url.url}</strong> - {url.status} - {url.responseTime}
//             </div>
//           ))}
//         </div>
//       </div>
//     </>

//   );
// };

// export default Profile;



/// My Old Working Profile


// import React, { useState, useEffect } from "react";
// import { useAuth } from "../context/AuthContext";
// // import axios from "../service/axiosSetUp.js";
// import axios from "axios";

// const ProfilePage = () => {
//   const [profiles, setProfiles] = useState([]);
//   const { authState } = useAuth();
//   const [form, setForm] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     role: "",
//   });
//   const [editId, setEditId] = useState(null);

//   useEffect(() => {
//     fetchProfile(); // Fetch the logged-in user's profile
//   }, []);

//   const fetchProfile = async () => {
//     const id = authState.user.user_id;
//     try {
//       const response = await axios.get(`http://localhost:8080/users/profile/${id}`);
//       if (response.status === 200) {
//         setProfiles([response.data]); // Populate profiles with the single user's data
//       }
//     } catch (error) {
//       console.error("Error fetching profile:", error);
//     }
//   };

//   const handleInputChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const id = authState.user.user_id;
//     try {
//       if (editId) {
//         // Update profile
//         await axios.put(`http://localhost:8080/users/profile/${id}`, form);
//         setProfiles((prev) =>
//           prev.map((profile) =>
//             profile.id === editId ? { ...profile, ...form } : profile
//           )
//         );
//       } else {
//         // Add profile logic (if needed for this use case)
//       }
//       setForm({ firstName: "", lastName: "", email: "", password: "", role: "" });
//       setEditId(null);
//     } catch (error) {
//       console.error("Error submitting form:", error);
//     }
//   };

//   const handleEdit = (profile) => {
//     setForm(profile);
//     setEditId(profile.id);
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:8080/users/profile/${id}`);
//       setProfiles((prev) => prev.filter((profile) => profile.id !== id));
//     } catch (error) {
//       console.error("Error deleting profile:", error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow-md">
//         <h1 className="text-2xl font-bold mb-4">Profile Management</h1>
//         <form className="space-y-4" onSubmit={handleSubmit}>
//           <div className="flex gap-4">
//             <input
//               type="text"
//               name="firstName"
//               placeholder="First Name"
//               value={form.firstName}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded"
//             />
//             <input
//               type="text"
//               name="lastName"
//               placeholder="Last Name"
//               value={form.lastName}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded"
//             />
//           </div>
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={form.email}
//             onChange={handleInputChange}
//             className="w-full p-2 border rounded"
//           />
//           <input
//             type="text"
//             name="role"
//             placeholder="Role"
//             value={form.role}
//             onChange={handleInputChange}
//             className="w-full p-2 border rounded"
//           />
//           <button
//             type="submit"
//             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//           >
//             {editId ? "Update" : "Add"} Profile
//           </button>
//         </form>

//         <div className="mt-6">
//           <h2 className="text-xl font-semibold mb-4">Profiles</h2>
//           {profiles.length > 0 ? (
//             <table className="w-full border-collapse border border-gray-200">
//               <thead>
//                 <tr className="bg-gray-100">
//                   <th className="p-2 border">First Name</th>
//                   <th className="p-2 border">Last Name</th>
//                   <th className="p-2 border">Email</th>
//                   <th className="p-2 border">Role</th>
//                   <th className="p-2 border">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {profiles.map((profile) => (
//                   <tr key={profile.id}>
//                     <td className="p-2 border">{profile.firstName}</td>
//                     <td className="p-2 border">{profile.lastName}</td>
//                     <td className="p-2 border">{profile.email}</td>
//                     <td className="p-2 border">{profile.role}</td>
//                     <td className="p-2 border flex gap-2">
//                       <button
//                         className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
//                         onClick={() => handleEdit(profile)}
//                       >
//                         Edit
//                       </button>
//                       <button
//                         className="bg-red-800 text-white px-2 py-1 rounded hover:bg-red-600"
//                         onClick={() => handleDelete(profile.id)}
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           ) : (
//             <p className="text-gray-500">No profiles available.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;

import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import "./ProfilePage.css";

const ProfilePage = () => {
  const [profiles, setProfiles] = useState([]);
  const { authState } = useAuth();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    // role: "",
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const id = authState.user.user_id;
    try {
      const response = await axios.get(`http://localhost:8080/users/profile/${id}`);
      if (response.status === 200) {
        setProfiles([response.data]);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = authState.user.user_id;
    try {
      if (editId) {
        await axios.put(`http://localhost:8080/users/profile/${id}`, form);
        setProfiles((prev) =>
          prev.map((profile) =>
            profile.id === editId ? { ...profile, ...form } : profile
          )
        );
      }
      setForm({ firstName: "", lastName: "", email: "", role: "" });
      setEditId(null);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleEdit = (profile) => {
    setForm(profile);
    setEditId(profile.id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/users/profile/${id}`);
      setProfiles((prev) => prev.filter((profile) => profile.id !== id));
    } catch (error) {
      console.error("Error deleting profile:", error);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1 className="title">Profile Management</h1>
        <form className="form" onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={form.firstName}
              onChange={handleInputChange}
              className="input"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={form.lastName}
              onChange={handleInputChange}
              className="input"
            />
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleInputChange}
            className="input"
          />
          {/* <input
            type="text"
            name="role"
            placeholder="Role"
            value={form.role}
            onChange={handleInputChange}
            className="input"
          /> */}
          <button type="submit" className="button save-btn">
            {editId ? "Update Profile" : "Add Profile"}
          </button>
        </form>

        <div className="table-container">
          <h2 className="title">Profiles</h2>
          {profiles.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  {/* <th>Role</th> */}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {profiles.map((profile) => (
                  <tr key={profile.id}>
                    <td>{profile.firstName}</td>
                    <td>{profile.lastName}</td>
                    <td>{profile.email}</td>
                    {/* <td>{profile.role}</td> */}
                    <td>
                      <button className="button edit-btn" onClick={() => handleEdit(profile)}>
                        Edit
                      </button>
                      <button className="button delete-btn" onClick={() => handleDelete(profile.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No profiles available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
