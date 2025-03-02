// import React from "react";

// const Footer = () => {
//   return (

    
//     // <footer className="bg-dark text-center text-white py-3">
//     //   <p>&copy; 2024 upTime. All rights reserved.</p>
//     // </footer>
//   );
// };

// export default Footer;

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
    return (
        <footer className="bg-dark text-white py-4 mt-5" >
            <Container>
                <Row>
                    <Col md={4}>
                        <h5>About Us</h5>
                        <p>
                            We are committed to delivering the best service and products to our customers.
                            Our team is composed of talented professionals who are passionate about their work and dedicated to making a difference.
                        </p>
                    </Col>
                    <Col md={4}>
                        <h5>Contact Us</h5>
                        <ul className="list-unstyled">
                            <li>Email: info@company.com</li>
                            <li>Phone: (123) 456-7890</li>
                            <li>Address: 123 Street Name, City, Country</li>
                        </ul>
                    </Col>
                    <Col md={4}>
                        <h5>Follow Us</h5>
                        <ul className="list-unstyled">
                            <li><a href="#" className="text-white">Facebook</a></li>
                            <li><a href="#" className="text-white">Twitter</a></li>
                            <li><a href="#" className="text-white">LinkedIn</a></li>
                        </ul>
                    </Col>
                </Row>
                <Row>
                    <Col className="text-center mt-4">
                        <p>© 2024 Your Company. All rights reserved.</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;

