
import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Navbar from "./Navbar";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import axios from "../service/axiosSetUp.js";
import { useAuth } from "../context/AuthContext";
// import axios from "axios";


function UrlInputPage() {

    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const url = searchParams.get("url");

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        url: "",
        interval: "",
        // threshold: "",
    });
    const [errors, setErrors] = useState({
        url: "",
        interval: "",
        // threshold: "",
    });

    const { authState } = useAuth();

    useEffect(() => {
        if (id && url) {
            fetchDetailsOfWebsiteForUpdate();
        } else {
            console.log("id is undefined url is /urlInput no idea is passed");
        }

    }, []);

    async function fetchDetailsOfWebsiteForUpdate() {

        setFormData({
            url: url,
            interval: "",
        });
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        console.log(formData);
        // Clear the error for the field being updated
        setErrors({ ...errors, [name]: "" });
    };

    const validate = () => {
        const newErrors = {};

        // URL validation: must be a valid URL
        if (!formData.url) {
            newErrors.url = "URL is required.";
        } else if (!/^https?:\/\/[^\s$.?#].[^\s]*$/.test(formData.url)) {
            newErrors.url = "Invalid URL format.";
        }

        // Interval validation: must be a positive number
        if (!formData.interval) {
            newErrors.interval = "Interval is required.";
        } else if (isNaN(formData.interval) || formData.interval <= 0) {
            newErrors.interval = "Interval must be a positive number.";
        }

        // Threshold validation: must be a positive number
        // if (!formData.threshold) {
        //   newErrors.threshold = "Threshold is required.";
        // } else if (isNaN(formData.threshold) || formData.threshold <= 0) {
        //   newErrors.threshold = "Threshold must be a positive number.";
        // }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    async function addMyWebsite(user_id, actualDto) {

        try {
            // {java}
            const response = await axios.post(`http://localhost:8080/users/add-website/${user_id}`, actualDto);
            // {dotnet}
            // const response = await axios.post(`http://localhost:5230/api/website`, actualDto);

            console.log(response) ;
            if (response.status === 200 || response.status === 201) {
                alert("url added Successfully");
                navigate("/user-dashboard");
            }

            if (response.status === 403) {
                alert("unauthorized access");
                navigate("/signin");
            }

        } catch (error) {
            console.log("err in UrlInputpage", error);
            // navigate("/signin");
        }

    }

    async function updateMyWebsite(web_id , actualDto){

        try {
            // {java}
            const response = await axios.put(`http://localhost:8080/users/update-website/${web_id}`, actualDto);
            // {dotnet}
            // const response = await axios.put(`http://localhost:5230/api/website/${web_id}`, actualDto);

            console.log(response) ;
            if (response.status === 200 || response.status === 201) {
                alert("url updated Successfully");
                navigate("/user-dashboard");
            }

            if (response.status === 403) {
                alert("unauthorized access");
                navigate("/signin");
            }

        } catch (error) {
            console.log("err in UrlInputpage", error);
            // navigate("/signin");
        }

    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const user_id = authState.user.user_id;
        const { interval, ...actualDto } = formData;
        {/*Dotnet*/}
        
        console.log("actual dto send : ", actualDto);
        if (validate()) {

            if(!id){
                actualDto.id = user_id ;
                console.log("ActualDto val user_id added");
                addMyWebsite(user_id, actualDto);
            }else{
                actualDto.id = id ;
                console.log("ActualDto update id added");

                updateMyWebsite(id , actualDto);
            }
            
            // alert("Form submitted successfully!");
            // navigate("/user-dashboard");
            // Handle successful submission logic
        }
    };

    return (

        <>
            {/* <Navbar type="home" /> */}
            <div
                className="  d-flex justify-content-center align-items-center"
                style={{ height: "100vh", margin: "5rem auto" }}
            >
                <Form
                    onSubmit={handleSubmit}
                    className="border p-4 rounded shadow  justify-content-center align-items-center"
                    style={{ width: "100%", maxWidth: "400px" }}
                >
                    {/* URL Field */}
                    <Form.Label htmlFor="basic-url">Your vanity URL</Form.Label>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon3" aria-required>
                            URL:
                        </InputGroup.Text>
                        <Form.Control
                            id="basic-url"
                            name="url"
                            value={formData.url}
                            onChange={handleChange}
                            placeholder="Enter a valid URL"
                        />
                    </InputGroup>
                    {errors.url && <Form.Text className="text-danger">{errors.url}</Form.Text>}

                    {/* Interval Field */}
                    <InputGroup className="mb-3">
                        <InputGroup.Text>Interval in minutes</InputGroup.Text>
                        <Form.Control
                            name="interval"
                            value={formData.interval}
                            onChange={handleChange}
                            placeholder="Enter interval in minutes"
                        />
                    </InputGroup>
                    {errors.interval && (
                        <Form.Text className="text-danger">{errors.interval}</Form.Text>
                    )}

                    {/* Threshold Field */}
                    {/* <InputGroup className="mb-3">
            <InputGroup.Text>Threshold minutes</InputGroup.Text>
            <Form.Control
              name="threshold"
              value={formData.threshold}
              onChange={handleChange}
              placeholder="Enter threshold value"
            />
          </InputGroup>
          {errors.threshold && (
            <Form.Text className="text-danger">{errors.threshold}</Form.Text>
          )} */}

                    {/* Create Monitor Button */}
                    <Button variant="outline-secondary" type="submit" className="w-100">
                        Create Monitor
                    </Button>
                </Form>
            </div>


        </>

    );
}

export default UrlInputPage;
