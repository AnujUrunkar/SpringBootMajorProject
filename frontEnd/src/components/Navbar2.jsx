// import React, { useState } from "react";
// import { NavLink } from "react-bootstrap";
// import { Link } from "react-router-dom";

// const Navbar2 = ({ type }) => {
//     const logo = "/public/logo.jpg"; // Dummy Logo URL
//     const [isVerified, setVerified] = useState(true);

//         return (
//             <>
//                 <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
//                     <div className="container-fluid">
//                         <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
//                             <span className="navbar-toggler-icon"></span>
//                         </button>
//                         <div className="collapse navbar-collapse" id="navbarNav">
//                             <ul className="navbar-nav ms-auto">

//                                 <li className="nav-item">

//                                     <NavLink className="navbar-brand" to="/">
//                                         <img src={logo} alt="logo" width="80" height="80" className="d-inline-block align-text-top" />
//                                     </NavLink>
//                                     {/* <Link className="navbar-brand" to="/">
//                                         <img src={logo} alt="logo" width="80" height="80" className="d-inline-block align-text-top" />
//                                     </Link> */}

//                                 </li>
//                                 <li className="nav-item">
//                                     {/* <Link to="/" className="nav-link active">Home</Link> */}
//                                     <NavLink to="/" className="nav-link active">Home</NavLink>

//                                 </li>

//                                 <li className="nav-item">
//                                     {/* <Link to="/user-dashboard" className="nav-link">User Dashboard</Link> */}

//                                     <NavLink to="/user-dashboard" className="nav-link">User Dashboard</NavLink>

//                                 </li>



//                                 <li className="nav-item">
//                                     {/* <Link to="/admin-dashboard" className="nav-link">Admin Dashboard</Link> */}
//                                     <NavLink to="/admin-dashboard" className="nav-link">Admin Dashboard</NavLink>

//                                 </li>


//                                 <li className="nav-item">
//                                     {/* <Link to="/profile" className="nav-link">Profile</Link> */}
//                                     <NavLink to="/profile" className="nav-link">Profile</NavLink>

//                                 </li>



//                                 <li className="nav-item">
//                                     {/* <Link to="/signin" className="nav-link">Sign In</Link> */}
//                                     <NavLink to="/signin" className="nav-link">Sign In</NavLink>

//                                 </li>



//                                 <li className="nav-item">
//                                     {/* <Link to="/signup" className="nav-link">Sign Up</Link> */}
//                                     <NavLink to="/signup" className="nav-link">Sign Up</NavLink>

//                                 </li>


//                                 <li className="nav-item">
//                                     {/* <Link to="/aboutus" className="nav-link">About Us</Link> */}
//                                     <NavLink to="/aboutus" className="nav-link">About Us</NavLink>

//                                 </li>
//                                 <li className="nav-item">
//                                     {/* <Link to="/contactus" className="nav-link">Contact Us</Link> */}
//                                     <NavLink to="/contactus" className="nav-link">Contact Us</NavLink>


//                                 </li>
//                                 <li className="nav-item">
//                                     <NavLink to="/urlInputPage" className="nav-link">Add New URL</NavLink>
//                                 </li>
//                                 <li className="nav-item">

//                                     <NavLink to="/signin" className="nav-link">Log Out</NavLink>

//                                 </li>

//                             </ul>
//                         </div>
//                     </div>
//                 </nav>
//             </>
//         );

// };





// export default Navbar2;



import React, { useState } from "react";
// import { NavLink } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from 'react-bootstrap/Button';
import "./Navbar2.css";
// import { useNavigate } from "react-router-dom";


const Navbar2 = () => {

    const logo = "/public/logo.jpg"; // Dummy Logo URL
    // const [isVerified, setVerified] = useState(true);

    const { authState, logOut } = useAuth();
    const navigate = useNavigate();

    function handleClick() {
        localStorage.removeItem('auth');
        logOut();
        if (!localStorage.getItem('auth')) {
            navigate("/signin");
        }
    }

    return (
        <>
            <nav className="navbar navbar-expand-md navbar-light bg-light pt-0" >
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/">
                        <img
                            src= "/public/orange.svg"
                            alt="logo"
                            width="60"
                            height="60"
                            className="d-inline-block align-text-top"
                        />
                    </NavLink>

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
                        {/* Add ms-auto to align the navigation items to the right */}
                        <ul className="navbar-nav ms-auto">

                            <li className="nav-item">
                                <NavLink to="/" className="nav-link nav-link-custom" activeClassName="active" >
                                    Home
                                </NavLink>
                            </li>
                            {/* {dotnet link} User and Admin*/}
                            {/* {authState.isVerified && authState.user.authorities === "User"

                                && <>
                                    <li className="nav-item">
                                        <NavLink to="/user-dashboard" className="nav-link nav-link-custom" activeClassName="active" >
                                            User Dashboard
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/urlInputPage" className="nav-link nav-link-custom" activeClassName="active">
                                            Add New URL
                                        </NavLink>
                                    </li>
                                </>

                            }

                            
                            {authState.isVerified && authState.user.authorities === "Admin"

                                && <li className="nav-item">
                                    <NavLink to="/admin-dashboard" className="nav-link nav-link-custom" activeClassName="active">
                                        Admin Dashboard
                                    </NavLink>
                                </li>

                            } */}

                            {authState.isVerified && authState.user.authorities === "ROLE_USER"

                            && <>
                                <li className="nav-item">
                                    <NavLink to="/user-dashboard" className="nav-link nav-link-custom" activeClassName="active" >
                                        User Dashboard
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/urlInputPage" className="nav-link nav-link-custom" activeClassName="active">
                                        Add New URL
                                    </NavLink>
                                </li>
                            </>

                            }


                            {authState.isVerified && authState.user.authorities === "ROLE_ADMIN"

                            && <li className="nav-item">
                                <NavLink to="/admin-dashboard" className="nav-link nav-link-custom" activeClassName="active">
                                    Admin Dashboard
                                </NavLink>
                            </li>

                            }


                            {/* <li className="nav-item">
                                <NavLink to="/urlInputPage" className="nav-link">
                                    Add New URL
                                </NavLink>
                            </li> */}

                            {authState.isVerified
                                && <>
                                    <li className="nav-item">
                                        <NavLink to="/profile" className="nav-link nav-link-custom" activeClassName="active">
                                            Profile
                                        </NavLink>
                                    </li>
                                    <li>
                                        <Button variant="primary" onClick={handleClick}>
                                            Log Out
                                        </Button>
                                    </li>

                                    {/* <li className="nav-item">
                                        <NavLink to="/signin" className="nav-link">
                                            Log Out
                                        </NavLink>
                                    </li> */}

                                </>



                            }
                            {/* <li className="nav-item">
                                <NavLink to="/profile" className="nav-link">
                                    Profile
                                </NavLink>
                            </li> */}
                            {!authState.isVerified
                                && <>

                                    <li className="nav-item">
                                        <NavLink to="/signin" className="nav-link nav-link-custom" activeClassName="active">
                                            Sign In
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/signup" className="nav-link nav-link-custom" activeClassName="active">
                                            Sign Up
                                        </NavLink>
                                    </li>
                                </>
                            }

                            <li className="nav-item">
                                <NavLink to="/aboutus" className="nav-link nav-link-custom" activeStyle={{
                                    color: "#FF8E00", // Active color
                                    fontWeight: "bold", // Optional styling
                                }} >
                                    About Us
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/contactus" className="nav-link nav-link-custom" activeClassName="active" >
                                    Contact Us
                                </NavLink>
                            </li>


                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar2;
