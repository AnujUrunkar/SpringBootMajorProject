import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { ToastContainer, toast , Slide} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link ,useNavigate } from 'react-router-dom';
import axios from 'axios' ;
const SignUpPage = () => {
    const notify = () => toast("Wow so easy!");
    // const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
    const [formData , setFormData] = useState({
        firstName : "" ,
        lastName : "" ,
        email: "",
        password: "",
        designation: "",
        companyName: "",
        confirmPassword : "",
        role : "ROLE_USER"  // Dotnet role : "User"
    });
    // ROLE_ADMIN
    const [errors , setErrors] = useState({

        firstName : "" ,
        lastName : "" ,
        email: "",
        password: "",
        designation: "",
        companyName: "",
        confirmPassword : ""


    });

    useEffect(()=>{
        console.log(formData);
        window.scrollTo(0, 0);
    }, []);

    function inputHandler(e){
        const {name , value} = e.target ;
        
        setFormData({
            ...formData , 
            [name] : value
        });

        setErrors({
            ...errors,
            [name] : ""
        })
        
    }

    

    const validateField = () => {
        const newErrors = {};
    
        // URL validation: must be a valid URL
        if (!formData.firstName) {
          newErrors.firstName = "First Name is required.";
        } else if (!/^[a-zA-Z]+$/.test(formData.firstName)) {
          newErrors.firstName = "Invalid name! Only letters allowed.";
        }

        if (!formData.lastName) {
            newErrors.lastName = "Last Name is required.";
          } else if (!/^[a-zA-Z]+$/.test(formData.lastName)) {
            newErrors.lastName = "Invalid name! Only letters allowed.";
          }
    
        // Interval validation: must be a positive number
        if (!formData.password) {
          newErrors.password = "Password is required.";
        } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{3,}$/.test(formData.password)) {
          newErrors.password = "Min 3 characters, 1 letter, 1 number.";
        }

        if (!formData.email) {
            newErrors.email = "Email is required.";
          } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
            newErrors.email = "Invalid Email formate";
        }

        if (!formData.designation) {
            newErrors.designation = "Please select designation" ;
        }

        if (!formData.companyName) {
            newErrors.companyName = "Company Name is required.";
          } else if (!/^[a-zA-Z\s'-]+$/.test(formData.companyName)) {
            newErrors.companyName = "Invalid name! Only letters, spaces, apostrophes, and hyphens are allowed.";
        }

        if(!formData.confirmPassword){
            newErrors.confirmPassword = "Confirm Password is required" ;
        }else if(formData.password !== formData.confirmPassword){
            newErrors.confirmPassword = "Password don't match" ;

        }
    
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
      };


      const handleSubmit = async (e) => {
        e.preventDefault();

        // check if the fields are filled and match the required formate
        if(validateField()){
            const {designation , companyName , confirmPassword , ...payloadw} = formData ;
            console.log(payloadw);
            // payloadw.role = "ROLE_USER" ;
            // console.log(payload , "payload Data")
            // const payload = { name, email, password, "dob": "2001-04-08", "ROLE": "ROLE_USER" };
            try {

                // {java}
                const response = await axios.post("http://localhost:8080/users/signup" , payloadw);

                // const response = await axios.post("http://localhost:5230/api/user" , payloadw);

                // {dotnet}
                // const response = await axios.post("http://localhost:5230/api/user" , payloadw);
                  
                // const response = await axios.post("http://localhost:8080/users/sigup", payload);
            
                if(response.status === 200 || response.status === 201){
                    toast.success("Form submitted successfully!", {
                        transition: Slide ,
                        onClose: () => navigate("/signin"), // Navigate after the toast closes
                        autoClose: 2000, // Adjust auto-close time as needed
                    });
    
                }else{
                    toast.error("Something went wrong Please register again", {
                        transition: Slide ,
                        // onClose: () => navigate("/signup"), // Navigate after the toast closes
                        autoClose: 2000 // Adjust auto-close time as needed
                    });
    
                }
            } catch (error) {
                console.log("error in SignUp page " , error ) ;
            }
           

            
        }
        
        
        // Add your sign-up logic here
    };

    return (
        <div className="dark-theme" style={{marginTop: "10rem" , marginBottom : "20rem"}}>
            <Container
                fluid
                className="vh-100 d-flex align-items-center justify-content-center"
            >
                <Row className="w-100 justify-content-center">
                    <Col xs={12} sm={8} md={6} lg={4}>
                        <Card className="p-4 shadow-lg bg-dark text-white">
                            <Card.Title className="text-center mb-4">
                                <h3>Sign Up</h3>
                            </Card.Title>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="formFName" className="mb-1" >
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter your First name"
                                        name = "firstName"
                                        value={formData.firstName}
                                        onChange={inputHandler}
                                        className="bg-secondary text-white border-0"
                                    />
                                </Form.Group>
                                {errors.firstName && <Form.Text className="text-danger mb-1">{errors.firstName}</Form.Text>}
                                <Form.Group controlId="formLName" className="mb-1" >
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter your Last name"
                                        name = "lastName"
                                        value={formData.lastName}
                                        onChange={inputHandler}
                                        className="bg-secondary text-white border-0"
                                    />
                                </Form.Group>
                                {errors.lastName && <Form.Text className="text-danger mb-1">{errors.lastName}</Form.Text>}
                                <Form.Group controlId="formEmail" className="mb-1">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email"
                                        name='email'
                                        value={formData.email}
                                        onChange={inputHandler}
                                        className="bg-secondary text-white border-0"
                                    />
                                </Form.Group>
                                {errors.email && <Form.Text className="text-danger mb-1">{errors.email}</Form.Text>}

                                <Form.Group controlId="formCompanyName" className="mb-1">
                                    <Form.Label>Company Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Company Name"
                                        name="companyName"
                                        value={formData.companyName}
                                        onChange={inputHandler}
                                        className="bg-secondary text-white border-0"
                                    />
                                </Form.Group>
                                {errors.companyName && <Form.Text className="text-danger mb-1">{errors.companyName}</Form.Text>}

                                
                                <Form.Group controlId="formDesignation" className="mb-1">
                                    <Form.Label>Designation</Form.Label>
                                    <Form.Select
                                        name="designation"
                                        value={formData.designation}

                                        onChange={inputHandler}
                                        className="bg-secondary text-white border-0"
                                    >
                                        <option value="">Select Role</option>
                                        <option value="owner">Owner</option>
                                        <option value="manager">Technical Manager</option>
                                        <option value="devloper">Developer</option>
                                        <option value="system">System Administrator</option>
                                        <option value="analyst">Quality Analyst</option>




                                    </Form.Select>
                                </Form.Group>
                                {errors.designation && <Form.Text className="text-danger mb-1">{errors.designation}</Form.Text>}

                                <Form.Group controlId="formPassword" className="mb-1">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name='password'
                                        placeholder="Enter password"
                                        value={formData.password}
                                        onChange={inputHandler}
                                        className="bg-secondary text-white border-0"
                                    />
                                </Form.Group>
                                {errors.password && <Form.Text className="text-danger mb-1">{errors.password}</Form.Text>}

                                {/* <InputGroup className="mb-3">
                                    <DropdownButton
                                        variant="outline-secondary"
                                        title="Dropdown"
                                        id="input-group-dropdown-1"
                                    >
                                        <Dropdown.Item href="#">Action</Dropdown.Item>
                                        <Dropdown.Item href="#">Another action</Dropdown.Item>
                                        <Dropdown.Item href="#">Something else here</Dropdown.Item>
                                        <Dropdown.Divider />
                                        <Dropdown.Item href="#">Separated link</Dropdown.Item>
                                    </DropdownButton>
                                    <Form.Control aria-label="Text input with dropdown button" />
                                </InputGroup> */}

                                <Form.Group controlId="formConfirmPassword" className="mb-1">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name='confirmPassword'
                                        placeholder="Re-enter password"
                                        value={formData.confirmPassword}
                                        onChange={inputHandler}
                                        className="bg-secondary text-white border-0"
                                    />
                                </Form.Group>
                                {errors.confirmPassword && <Form.Text className="text-danger mb-1">{errors.confirmPassword}</Form.Text>}

                                <Button variant="primary" type="submit" className="w-100 mt-4">
                                    Sign Up
                                </Button>
                            </Form>
                            <div className="mt-3 text-center">
                                <small>
                                    Already have an account?{' '}
                                    <Link to="/signin" className="text-primary">
                                        Login
                                    </Link>
                                </small>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <ToastContainer />
        </div>
        
    );
};

export default SignUpPage;
