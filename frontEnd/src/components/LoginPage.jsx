import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
//{dotnet}
// import axios from 'axios';
// {java}
import axios from '../service/axiosSetUp.js' ;
import { jwtDecode } from 'jwt-decode';
import { useAuth } from '../context/AuthContext';
const LoginPage = () => {

    const navigate = useNavigate();


    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    const {login} = useAuth();
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });

    const [loginErrors, setLoginErrors] = useState({
        email: "",
        password: ""
    });

    useEffect(() => {
        // Scroll to the top of the page when the component loads
        window.scrollTo(0, 0);
    }, []);

    function inputHandler(e) {

        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value
        });
        setLoginErrors({
            ...loginErrors,
            [name]: ""
        });

    }

    const validate = () => {

        const newErrors = {};

        if (!loginData.email) {
            newErrors.email = "Email is required";
        } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(loginData.email)) {
            newErrors.email = "Invalid email formate";
        }

        if (!loginData.password) {
            newErrors.password = "Password is required";
        } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{3,}$/.test(loginData.password)) {
            newErrors.password = "Min 8 characters, 1 letter, 1 number";
        }

        setLoginErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    }



    const handleSubmit = async (e) =>{
        e.preventDefault();

        if (validate()) {

            // console.log('Email:', email, 'Password:', password);
            // const payload = { email, password };
            try {
                // http://localhost:5230/api/auth

                // {java}
                const response = await axios.post("http://localhost:8080/users/signin", loginData);


                // {dotnet}
                // const response = await axios.post("http://localhost:5230/api/auth", loginData);
                console.log(response);
    
                if(response.status === 201 || response.status === 200){
                        
                    // {java}
                    const token = response.data.jwt;

                    // {dotnet}
                    // const token = response.data;
                    console.log(jwtDecode(token));
                   
                    localStorage.setItem("auth", token);
                    const decodedToken = jwtDecode(token) ;
                    
                    

                    // const { exp ,iat ,    ...filteredData } = decodedToken;
                    const filteredObject = {
                        user_id: decodedToken.user_id,
                        authorities: decodedToken.authorities,
                        sub: decodedToken.sub
                      };
                    // login(filteredData);
                    login(filteredObject);
                    alert("Login form Submited successfully");
                   // console.log(decodedToken.user.value);
                    navigate("/");
    
                    // login();
                }
    
                if(response.status === 403){
    
                    console.log(response);
                    alert("Unauthorized access");
                    navigate("/");
                }
                
            } catch (error) {
                console.log("error in Login try catach " ,  error);
            }
           
            
            
        }
        // console.log('Email:', email, 'Password:', password);

        // Add your login logic here
    };

    return (
        <div className="dark-theme">
            <Container
                fluid
                className="vh-100 d-flex align-items-center justify-content-center"
            >
                <Row className="w-100 justify-content-center">
                    <Col xs={12} sm={8} md={6} lg={4}>
                        <Card className="p-4 shadow-lg bg-dark text-white">
                            <Card.Title className="text-center mb-4">
                                <h3>Login</h3>
                            </Card.Title>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="formEmail" className="mb-1">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        placeholder="Enter email"
                                        value={loginData.email}
                                        onChange={inputHandler}
                                        className="bg-secondary text-white border-0"
                                    />
                                </Form.Group>
                                {loginErrors.email && <Form.Text className="text-danger mb-1">{loginErrors.email}</Form.Text>}

                                <Form.Group controlId="formPassword" className="mb-1">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        placeholder="Enter password"
                                        value={loginData.password}
                                        onChange={inputHandler}
                                        className="bg-secondary text-white border-0"
                                    />
                                </Form.Group>
                                {loginErrors.password && <Form.Text className="text-danger mb-1">{loginErrors.password}</Form.Text>}

                                <Button variant="primary" onClick={handleSubmit} className="w-100 mt-3">
                                    Login
                                </Button>
                            </Form>
                            <div className="mt-3 text-center">
                                <small>
                                    Don't have an account?{' '}
                                    <Link to="/signup" className="text-primary">
                                        Sign up
                                    </Link>
                                </small>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default LoginPage;
