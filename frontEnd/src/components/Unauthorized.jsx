
// import React  from "react";

// const Unauthorized = ()=>{

//     return(

//         <>
//         </>
//     )
    
// }

import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // to handle navigation

const Unauthorized = () => {
  const navigate = useNavigate(); // For navigation to home page

  const handleRedirect = () => {
    navigate('/'); // Redirect to home page
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Row className="text-center">
        <Col>
          <div className="mb-4">
            <h1 className="display-4 text-danger">Unauthorized</h1>
            <p className="lead text-muted">You don't have permission to view this page.</p>
          </div>
          <Button
            variant="primary"
            size="lg"
            onClick={handleRedirect}
            className="mt-3"
            style={{ padding: '10px 30px' }}
          >
            Go to Home
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Unauthorized;



