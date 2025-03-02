import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Navbar from './Navbar';

const AboutUs = () => {
  return (

    <>
      {/* <Navbar type="home"/> */}
      <Container className="my-5">
        <Row className="mb-5">
          <Col md={12}>
            <h1>About Us</h1>
            <p className="lead">
              Welcome to our company! We are committed to delivering the best service and products to our customers.
            </p>
            <p>
              Our team is composed of talented professionals who are passionate about their work and dedicated to making a difference.
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            <h2>Our Team</h2>
          </Col>
        </Row>
        <Row>
          <Col md={3}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>Sakshi Thange</Card.Title>
                <Card.Text>CEO</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>Anuj Urunkar</Card.Title>
                <Card.Text>CFO</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>Ayush Sign</Card.Title>
                <Card.Text>CFO</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>Chinmay Gaikwakd</Card.Title>
                <Card.Text>CFO</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>Somesh</Card.Title>
                <Card.Text>CFO</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>


    </>

  );
};

export default AboutUs;
