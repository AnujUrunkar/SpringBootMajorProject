// import { useState } from "react";
// import { Form, Button, Container, Row, Col } from "react-bootstrap";
// import Swal from "sweetalert2";


// function ContactUs (){
//   const [formData, setFormData] = useState({
//     FirstName: '',
//     LastName: '',
//     email: '',
//     message: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const { FirstName, LastName, email, message } = formData;

//     if (!FirstName || !LastName || !email || !message) {
//       Swal.fire({
//         title: "Error",
//         text: "Please fill out all fields before submitting.",
//         icon: "error",
//       });
//       return;
//     }

//     console.log("Form submitted:", formData);
//     Swal.fire({
//       title: "Success",
//       text: "Message sent successfully!",
//       icon: "success",
//     });
//   };

//   return (

//     <>
//       <Navbar type="home" />
//       <Container className="mt-5">
//         <Row className="justify-content-center">
//           <Col xs={12} md={8} lg={6}>
//             <h2 className="text-center mb-4">Contact Us</h2>
//             <Form onSubmit={handleSubmit}>
//               {/* First Name */}
//               <Form.Group className="mb-3" controlId="FirstName">
//                 <Form.Label>First Name</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="FirstName"
//                   placeholder="Enter Your First Name"
//                   value={formData.FirstName}
//                   onChange={handleChange}
//                   required
//                 />
//               </Form.Group>

//               {/* Last Name */}
//               <Form.Group className="mb-3" controlId="LastName">
//                 <Form.Label>Last Name</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="LastName"
//                   placeholder="Enter Your Last Name"
//                   value={formData.LastName}
//                   onChange={handleChange}
//                   required
//                 />
//               </Form.Group>

//               {/* Email */}
//               <Form.Group className="mb-3" controlId="email">
//                 <Form.Label>Email</Form.Label>
//                 <Form.Control
//                   type="email"
//                   name="email"
//                   placeholder="Enter Your Email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   required
//                 />
//               </Form.Group>

//               {/* Message */}
//               <Form.Group className="mb-4" controlId="message">
//                 <Form.Label>Your Message</Form.Label>
//                 <Form.Control
//                   as="textarea"
//                   name="message"
//                   rows={4}
//                   placeholder="Enter Your Message"
//                   value={formData.message}
//                   onChange={handleChange}
//                   required
//                 />
//               </Form.Group>

//               {/* Submit Button */}
//               <div className="d-grid">
//                 <Button variant="primary" type="submit">
//                   Send Message
//                 </Button>
//               </div>
//             </Form>
//           </Col>
//         </Row>
//       </Container>

//     </>

//   );
// }

// export default ContactUs;



// import React, { useState } from "react";
// import { Form, Button, Container, Row, Col } from "react-bootstrap";
// import Swal from "sweetalert2";
// import Navbar from "./Navbar";

// function ContactUs() {
//   const [formData, setFormData] = useState({
//     FirstName: "",
//     LastName: "",
//     email: "",
//     message: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const { FirstName, LastName, email, message } = formData;

//     if (!FirstName || !LastName || !email || !message) {
//       Swal.fire({
//         title: "Error",
//         text: "Please fill out all fields before submitting.",
//         icon: "error",
//       });
//       return;
//     }

//     console.log("Form submitted:", formData);
//     Swal.fire({
//       title: "Success",
//       text: "Message sent successfully!",
//       icon: "success",
//     });


//     setFormData({
//       FirstName: "",
//       LastName: "",
//       email: "",
//       message: "",
//     });
//   };

//   return (


//     <>
//       {/* <Navbar type="home" /> */}
//       <Container className="mt-5">
//         <Row className="justify-content-center">
//           <Col xs={12} md={8} lg={6}>
//             <h2 className="text-center mb-4">Contact Us</h2>
//             <Form onSubmit={handleSubmit}>
//               {/* First Name */}
//               <Form.Group className="mb-3" controlId="FirstName">
//                 <Form.Label>First Name</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="FirstName"
//                   placeholder="Enter Your First Name"
//                   value={formData.FirstName}
//                   onChange={handleChange}
//                   required
//                 />
//               </Form.Group>

//               {/* Last Name */}
//               <Form.Group className="mb-3" controlId="LastName">
//                 <Form.Label>Last Name</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="LastName"
//                   placeholder="Enter Your Last Name"
//                   value={formData.LastName}
//                   onChange={handleChange}
//                   required
//                 />
//               </Form.Group>

//               {/* Email */}
//               <Form.Group className="mb-3" controlId="email">
//                 <Form.Label>Email</Form.Label>
//                 <Form.Control
//                   type="email"
//                   name="email"
//                   placeholder="Enter Your Email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   required
//                 />
//               </Form.Group>

//               {/* Message */}
//               <Form.Group className="mb-4" controlId="message">
//                 <Form.Label>Your Message</Form.Label>
//                 <Form.Control
//                   as="textarea"
//                   name="message"
//                   rows={4}
//                   placeholder="Enter Your Message"
//                   value={formData.message}
//                   onChange={handleChange}
//                   required
//                 />
//               </Form.Group>

//               {/* Submit Button */}
//               <div className="d-grid">
//                 <Button variant="primary" type="submit">
//                   Send Message
//                 </Button>
//               </div>
//             </Form>
//           </Col>
//         </Row>
//       </Container>

//     </>

//   );
// }

// export default ContactUs;


/// LAtest Commit 


// import React, { useState } from "react";
// import { Form, Button, Container, Row, Col } from "react-bootstrap";
// import Swal from "sweetalert2";
// import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";


// const mapContainerStyle = {
//   width: "40%",  
//   height: "300px" 
// };


// const center = {
//   lat: 19.0434, // CDAC Kharghar Latitude
//   lng: 73.0699, // CDAC Kharghar Longitude
// };
// export default function ContactUs() {
//   const [formData, setFormData] = useState({
//     FirstName: "",
//     LastName: "",
//     email: "",
//     message: "",
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const { FirstName, LastName, email, message } = formData;

//     // Validate Form
//     if (!FirstName || !LastName || !email || !message) {
//       Swal.fire({
//         title: "Error",
//         text: "Please fill out all fields before submitting.",
//         icon: "error",
//       });
//       return;
//     }

   

//     // Prepare form data for Forms to admin email 
//     const submissionData = new FormData();
//     submissionData.append("access_key", "e10349bc-e256-4886-b89b-aa3efd2e75cc"); 
//     submissionData.append("FirstName", FirstName);
//     submissionData.append("LastName", LastName);
//     submissionData.append("email", email);
//     submissionData.append("message", message);

//     // Submit to Web3Forms
   
//       const response = await fetch("https://api.web3forms.com/submit", {
//         method: "POST",
//         body: submissionData,
//       });

//       const result = await response.json();

//       if (result.success) {
//         Swal.fire({
//           title: "Success",
//           text: "Message sent successfully!",
//           icon: "success",
//         });
//         setFormData({ FirstName: "", LastName: "", email: "", message: "" });
//       } else {
//         Swal.fire({
//           title: "Error",
//           text: result.message || "Something went wrong.",
//           icon: "error",
//         });
//       }
//     } 
  

//   return (
//     <Container className="mt-5">
//       <Row className="justify-content-center">
//       <Col xs={12} md={8} lg={6}>

//           <h2 className="text-center mb-4">Contact Us</h2>
//           <Form onSubmit={handleSubmit}>
//             {/* First Name */}
//             <Form.Group className="mb-3" controlId="FirstName">
//               <Form.Label>First Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="FirstName"
//                 placeholder="Enter Your First Name"
//                 value={formData.FirstName}
//                 onChange={handleChange}
//                 required
//               />
//             </Form.Group>

//             {/* Last Name */}
//             <Form.Group className="mb-3" controlId="LastName">
//               <Form.Label>Last Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="LastName"
//                 placeholder="Enter Your Last Name"
//                 value={formData.LastName}
//                 onChange={handleChange}
//                 required
//               />
//             </Form.Group>

//             {/* Email */}
//             <Form.Group className="mb-3" controlId="email">
//               <Form.Label>Email</Form.Label>
//               <Form.Control
//                 type="email"
//                 name="email"
//                 placeholder="Enter Your Email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//               />
//             </Form.Group>

//             {/* Message */}
//             <Form.Group className="mb-4" controlId="message">
//               <Form.Label>Your Message</Form.Label>
//               <Form.Control
//                 as="textarea"
//                 name="message"
//                 rows={4}
//                 placeholder="Enter Your Message"
//                 value={formData.message}
//                 onChange={handleChange}
//                 required
//               />
//             </Form.Group>

//             {/* Submit Button */}
//             <div className="d-grid">
//             <Button variant="primary" type="submit"> Send Message
//                       </Button>

//             </div>
//           </Form>
//           </Col>
//           </Row>
//        {/* Google Maps Section */}
//        <Row className="justify-content-center mt-5">
//         <Col xs={12}>
//           <h3 className="text-center mb-3">Our Location</h3>
//           <LoadScript googleMapsApiKey="AIzaSyAsQNe5oKM0HLozA_l4s9oRzR7A1Zs5HOs">
//             <GoogleMap
//               mapContainerStyle={mapContainerStyle}
//               center={center}
//               zoom={15}
//             >
//               <Marker position={center} />
//             </GoogleMap>
//           </LoadScript>
//         </Col>
//       </Row>
//     </Container>
  
//   );
// }




import React from "react";

const ContactUs = () => {
  return (
    <div
      className="contact-container"
      style={{
        maxWidth: "100%", // Keeps the container wide
        margin: "50px auto",
        padding: "40px",
        textAlign: "center",
        background: "#f9f9f9",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Contact Form */}
      <h2 style={{ marginBottom: "20px", color: "#333", fontSize: "28px" }}>
        Get in Touch
      </h2>
      <form
        className="contact-form"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          width: "100%", // Increased width of form
          maxWidth: "1000px", // Keeps it from being too wide
          margin: "0 auto",
        }}
      >
        <input
          type="text"
          placeholder="Your Name"
          style={{
            padding: "14px",
            fontSize: "18px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            outline: "none",
            width: "100%",
          }}
        />
        <input
          type="email"
          placeholder="Your Email"
          style={{
            padding: "14px",
            fontSize: "18px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            outline: "none",
            width: "100%",
          }}
        />
        <textarea
          placeholder="Your Message"
          style={{
            padding: "14px",
            fontSize: "18px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            height: "160px",
            outline: "none",
            width: "100%",
          }}
        ></textarea>
        <button
          type="submit"
          style={{
            padding: "14px",
            fontSize: "20px",
            background: "#007bff",
            color: "white",
            border: "none",
            cursor: "pointer",
            borderRadius: "8px",
            transition: "0.3s",
          }}
          onMouseOver={(e) => (e.target.style.background = "#0056b3")}
          onMouseOut={(e) => (e.target.style.background = "#007bff")}
        >
          Send Message
        </button>
      </form>

      {/* Map Section */}
      <h3 style={{ marginTop: "40px", color: "#333", fontSize: "26px" }}>
        Our Location
      </h3>
      <div
        className="map-container"
        style={{
          width: "500px",
          height: "500px", // Keeps it proportional
          marginTop: "20px",
          borderRadius: "10px",
          overflow: "hidden",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        }}
      >
        <iframe
          title="CDAC Kharghar, Navi Mumbai"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3768.220528760342!2d73.07079267470355!3d19.181025349780287!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7e95bbba72c2d%3A0x50ff8a4ec8fca0a9!2sCDAC%20Kharghar!5e0!3m2!1sen!2sin!4v1707523419123"
          width="100%"
          height="100%"
          style={{ border: "0" }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactUs;


