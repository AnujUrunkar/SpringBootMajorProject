import React, { useEffect } from 'react';
// import {Button , Modal} from 'react-bootstrap';
import { Button, Modal } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
// import {Link} from 'react-router-dom' ;
// import Linegraph from './Components/Graph/LineGraph/Linegraph';
// import Linegraph from './Graph/LineGraph/Linegraph.jsx';
import Linegraph from './Linegraph.jsx';
// import InfoCard from './Commonfile/InfoCard/InfoCard.jsx';
import InfoCard from './InfoCard.jsx';
// import InfoCard from './Components/Commonfile/InfoCard/InfoCard.jsx';
import Navbar from './Navbar.jsx';
import { useState } from "react";
import axios from '../service/axiosSetUp.js';
// import axios from 'axios';

function Complex() {

	const { id } = useParams();
	const [show, setShow] = useState(false);

	const [searchParams] = useSearchParams();
	const url = searchParams.get("url");
	const navigate = useNavigate();
	const website = url.split("//")[1].split("/")[0];
	let websiteName;
	let webPart = website.split(".");

	if (webPart.length >= 3) {
		websiteName = webPart[1];
	} else {
		websiteName = webPart[0];
	}
	const [statisticData , setStatisticData ] = useState({

		CurrentStatus : "" ,
		incident : "" ,
		average : "" ,
		percentageUp : "" ,
		percentageDown : "" ,
	});
	useEffect(() => {
        console.log("Initializing Line Chart...");

        // Function to fetch data from backend
        const fetchData = async () => {
            try {

				const [response1, response2, response3, response4] = await Promise.all([
                    axios.get(`http://localhost:8080/users/monitoring-dashboard/top/${id}`),
                    axios.get(`http://localhost:8080/users/monitoring-dashboard/incidents/${id}`),
                    axios.get(`http://localhost:8080/users/monitoring-dashboard/average/${id}`),
                    axios.get(`http://localhost:8080/users/monitoring-dashboard/percentage/${id}`),
                ]);
                // const response = await axios.get(`http://localhost:8080/users/monitoring-dashboard/top/${website_id}`); // Replace with your backend URL
                // const response2 = await axios.get(`http://localhost:8080/users/monitoring-dashboard/incidents/${website_id}`) ;
                // const response3 = await axios.get( `http://localhost:8080/users/monitoring-dashboard/average/${website_id}`);
                // const response4 = await axios.get(`http://localhost:8080/users/monitoring-dashboard/percentage/${website_id}`);

                
				console.log("Response 1:", response1.data);
                console.log("Response 2:", response2.data);
                console.log("Response 3:", response3.data);
                console.log("Response 4:", response4.data);

                const CurrentStatus = response1.data[0]?.statusCode || "N/A";
                const incident =  response2.data !== null && response2.data !== undefined ? response2.data : "N/A";
                const average = response3.data || "N/A";
                const percentageUp = response4.data || 0;
                const percentageDown = 100 - percentageUp;

                // Updating state
                setStatisticData({
                    CurrentStatus,
                    incident,
                    average,
                    percentageUp,
                    percentageDown,
                });
				// const CurrentStatus = response1.data[0].statusCode ;
				// const incident = response2.data ;
				// const average = response3.data ;
				// const percentageUp = response4.data ;
				// const percentageDown = 100 - percentageUp ;
                
                

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        // Call fetchData every 60 seconds
        const intervalId = setInterval(fetchData, 72000);
        
        // Initial fetch
        fetchData();

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);

    }, []);
	// const websiteName = url.split("www.")[1].split('.')[0] ;

	console.log(id, "This is id");
	console.log(url, "This is url");

	function takemeToUrlPage() {
		navigate(`/urlInputPage/${id}?url=${encodeURIComponent(url)}`);
	}

	function takmeToWebsite() {
		// window.location.href = "www.meshow.com" ;
		window.open(url, '_blank');
	}
	/// Logic to delete

	const handleShow = () => setShow(true);
	const handleClose = () => setShow(false);
	const handleDelete = async () => {
		console.log("Item deleted successfully!");

		try {
			// {java}
			const response = await axios.delete(`http://localhost:8080/users/delete-website/${id}`);
			// {dotnet}
			// const response = await axios.delete(`http://localhost:5230/api/website/${id}`);
			if (response.status === 200 || response.status === 204) {
				setShow(false);
				alert("item deleted successfully");
				navigate("/user-dashboard");
				
			}

			if (response.status === 403) {
				// alert("unauthorized access");
				setShow(false);
				navigate("/unAuthorized");
			}


		} catch (error) {
			console.log(error);
		}

		// Add your delete logic here
		
	};



	return (
		<>
			{/* <Navbar type="user"/> */}
			<Container fluid className="mt-5 mb-5">


				<Stack direction="horizontal" gap={3} >
					<div className="p-2 h-10" /* style={{ backgroundColor: 'lightblue' }} */ >
						<h3 >{website}</h3>
						<p id='goToWebsite' onClick={takmeToWebsite} target="_blank">Go to {websiteName}</p>

					</div>
					<Button id='edit_btn' onClick={takemeToUrlPage} variant="dark" className='ms-auto me-5'>Edit</Button>
					<Button id='delete_btn' variant="danger" onClick={handleShow}> Delete </Button>

					<Modal show={show} onHide={handleClose}>
						<Modal.Header closeButton>
							<Modal.Title>Confirm Deletion</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							Are you sure you want to delete this item? This action cannot be undone.
						</Modal.Body>
						<Modal.Footer>
							<Button variant="secondary" onClick={handleClose}>
								Cancel
							</Button>
							<Button variant="danger" onClick={handleDelete}>
								Delete
							</Button>
						</Modal.Footer>
					</Modal>
					{/* <Button id='edit_btn' onClick={deleteMyWebsite} variant="dark" className='ms-auto me-5'>Delete</Button> */}


				</Stack>


				<Stack direction="horizontal" gap={3}>
					<InfoCard title="Current Status" status={statisticData.CurrentStatus >= 200 && statisticData.CurrentStatus <= 206 ? "Up" : "Down"} desc={statisticData.CurrentStatus >= 200 && statisticData.CurrentStatus <= 206 ? "Your website is fine" : "Your Website is down"} />
					<InfoCard title="Last 7 Days" status={statisticData.incident} desc="Your incident in previous 7 days" />
				</Stack>
				<Stack direction="horizontal" gap={3}>
					<InfoCard title="Avg Response Time" status={`${statisticData.average} ms`} desc="Your avg Response Time" />
					<InfoCard title="Percentage" status={`Up : ${statisticData.percentageUp}% and Down : ${statisticData.percentageDown}% `} desc="Percentage Website Up/Down" />
				</Stack>


				<Linegraph website_id = {id}/>
			</Container>

		</>
	);
}

export default Complex;