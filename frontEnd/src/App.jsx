import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
// import { useLocation } from 'react-router'

import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Profile from './components/Profile'; // Assuming you have a Profile component
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import Complex from './components/Complex';
import UrlInputPage from './components/UrlInputPage';
import Footer from './components/Footer';
import AboutUs from './components/AboutUs';
import ContactUs from './components/contactus';
import { AuthProvider } from './context/AuthContext.jsx';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx';
import Unauthorized from './components/Unauthorized.jsx';
import Navbar2 from './components/Navbar2.jsx';
const App = () => {

	const location = useLocation();
	console.log(location);
	return (

		<AuthProvider>

			{/* <Router> */}
				{/* Navbar */}

				
				{location.pathname !== '/signin'  && location.pathname !== '/signup' && location.pathname !== '/unAuthorized' && <Navbar2/>}
				{/* Routes for different pages */}
				<Routes>


					{/* No Auth required Routes */}
					<Route path="/" element={<Home />} />
					<Route path="/signin" element={<LoginPage />} />
					<Route path="/signup" element={<SignUpPage />} />
					<Route path="/contactus" element={<ContactUs />} />
					<Route path="/aboutus" element={<AboutUs />} />
					<Route path='/unAuthorized' element={<Unauthorized/>} />

					{/* Protected routes for Admin */}

					{/* {Java} */}
					<Route path="/admin-dashboard" element={<ProtectedRoute role="ROLE_ADMIN" >
						<AdminDashboard />
					</ProtectedRoute>} />


						{/*dotnet*/}

					{/* <Route path="/admin-dashboard" element={<ProtectedRoute role="Admin" >
						<AdminDashboard />
					</ProtectedRoute>} /> */}


					{/* Protected Route for the user */}

					<Route path="/user-dashboard" element= {<ProtectedRoute role="ROLE_USER" >
						<UserDashboard />
					</ProtectedRoute>} />
					<Route path="/monitor/:id" element={<ProtectedRoute role="ROLE_USER" >
						<Complex />
					</ProtectedRoute> } />
					<Route path="/urlInputPage" element={<ProtectedRoute role="ROLE_USER" >
						<UrlInputPage />
					</ProtectedRoute> } />
					<Route path="/urlInputPage/:id" element={<ProtectedRoute role="ROLE_USER" >
						<UrlInputPage />
					</ProtectedRoute> } />
					<Route path="/profile" element={<ProtectedRoute role="both">
						<Profile />
					</ProtectedRoute> } />



					{/*Dotnet routes */}

					{/* <Route path="/user-dashboard" element= {<ProtectedRoute role="User" >
						<UserDashboard />
					</ProtectedRoute>} />
					<Route path="/monitor/:id" element={<ProtectedRoute role="User" >
						<Complex />
					</ProtectedRoute> } />
					<Route path="/urlInputPage" element={<ProtectedRoute role="User" >
						<UrlInputPage />
					</ProtectedRoute> } />
					<Route path="/urlInputPage/:id" element={<ProtectedRoute role="User" >
						<UrlInputPage />
					</ProtectedRoute> } />


					
					<Route path="/profile" element={<ProtectedRoute role="both">
						<Profile />
					</ProtectedRoute> } />
					<Route path='/unAuthorized' element={<Unauthorized/>} /> */}








					{/* <Route path="/signin" element={<LoginPage />} />
					<Route path="/signup" element={<SignUpPage />} />
					<Route path="/contactus" element={<ContactUs />} />
					<Route path="/aboutus" element={<AboutUs />} /> */}

					{/* <Route path="/admin-dashboard" element={<AdminDashboard />} />
					<Route path="/user-dashboard" element= {<UserDashboard /> } />
					<Route path="/monitor/:id" element={<Complex /> } />
					<Route path="/urlInputPage" element={<UrlInputPage/>} />  */}

				</Routes>

			
				{location.pathname !== '/signin'  && location.pathname !== '/signup' && location.pathname !== '/unAuthorized' && <Footer />}	
				 

				{/* Footer */}
				{/* <footer className="footer mt-auto py-3 bg-dark">
        <div className="container">
          <span className="text-muted">upTime &copy; 2024</span>
        </div>
      </footer> */}
			{/* </Router> */}

		</AuthProvider>

	);
};

export default App;
