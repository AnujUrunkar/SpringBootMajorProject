// import React, { useEffect, useState } from 'react';
import { Chart as ChartJS } from 'chart.js/auto';
import { Bar, Line } from "react-chartjs-2";
// import axios from 'axios';

// function Linegraph() {

//     useEffect(()=>{
//       console.log("Hello World this is Line Chart");
//       axios.get();
//     });
//     const [dataPoints , setDataPoints] = useState([0, 500, 200, 0, 500, 200, 3000, 500, 200 , 500, 200, 0, 500, 1000]);
//     const chartOptions = {
//         responsive: true,
//         scales: {
//           x: {
//             title: {
//               display: false,
//               text: 'Date',
//             },
//           },
//           y: {
//             title: {
//               display: true,
//               text: 'Response Time (ms)',
//             },
//           },
//         },
//       };
//     return (
//         <>

//             <div style={{ width: '70%', margin: ' auto', display: 'block' , height:'55%' }}>
//                 <Line 
//                     data={{

//                         labels: ['28-11-2024', '29-11-2024', '30-11-2024', '28-11-2024', '29-11-2024', '30-11-2024', '28-11-2024', '29-11-2024', '30-11-2024' , '30-11-2024' , '30-11-2024',  '30-11-2024'],
//                         datasets: [{
//                             label: 'Response Time',
//                             data: dataPoints,
//                             borderColor: '#000000',
//                             backgroundColor: '#000000', 
//                         },
//                            ]
//                     }}

//                     options={chartOptions}
                    
//                 />
//             </div>


//         </>
//     )
// }

// export default Linegraph


// import React, { useEffect, useState } from "react";
// // import { Line } from "react-chartjs-2";

// function Linegraph({website_id}) {
//     // State to store response times and corresponding dates
//     const [dataPoints, setDataPoints] = useState([]);
//     const [labels, setLabels] = useState([]);

//     useEffect(() => {
//         console.log("Initializing Line Chart...");

//         // Function to simulate fetching data from backend
//         const fetchData = () => {
//             const newDataPoint = Math.floor(Math.random() * 3000); // Random response time (0 - 3000ms)
//             const newLabel = new Date().toLocaleDateString("en-GB"); // Current date in DD-MM-YYYY format

//             setDataPoints(prevData => {
//                 let updatedData = [...prevData];

//                 // Remove the oldest value if array exceeds 12
//                 if (updatedData.length >= 100) {
//                     updatedData.reverse().pop();
//                     updatedData.reverse();
//                 }

//                 updatedData.push(newDataPoint);
//                 return updatedData;
//             });

//             setLabels(prevLabels => {
//                 let updatedLabels = [...prevLabels];

//                 // Remove the oldest label if labels exceed 12
//                 if (updatedLabels.length >= 100) {
//                     updatedLabels.reverse().pop();
//                     updatedLabels.reverse();
//                 }

//                 updatedLabels.push(newLabel);
//                 return updatedLabels;
//             });
//         };

//         // Call fetchData every 60 seconds
//         const intervalId = setInterval(fetchData, 6000);
        
//         // Initial fetch with dummy data
//         fetchData();

//         // Cleanup interval on component unmount
//         return () => clearInterval(intervalId);

//     }, []);

//     const chartOptions = {
//         responsive: true,
//         scales: {
//             x: {
//                 title: {
//                     display: true,
//                     text: 'Date',
//                 },
//             },
//             y: {
//                 title: {
//                     display: true,
//                     text: 'Response Time (ms)',
//                 },
//             },
//         },
//     };

//     return (
//         <>
//             <div style={{ width: '70%', margin: 'auto', display: 'block', height: '55%' }}>
//                 <Line
//                     data={{
//                         labels: labels,  // Dynamic labels (dates)
//                         datasets: [{
//                             label: 'Response Time',
//                             data: dataPoints,  // Response times
//                             borderColor: '#000000',
//                             backgroundColor: '#000000',
//                         }]
//                     }}
//                     options={chartOptions}
//                 />
//             </div>
//         </>
//     );
// }

// export default Linegraph;





import React, { useEffect, useState } from "react";
// import { Line } from "react-chartjs-2";

/// When backend will come -------------------------------------------
// import React, { useEffect, useState } from "react";
// import { Line } from "react-chartjs-2";
import axios from "axios";

function Linegraph({website_id}) {
    // State to store response time and corresponding dates
    const [dataPoints, setDataPoints] = useState([]);
    const [labels, setLabels] = useState([]);

    useEffect(() => {
        console.log("Initializing Line Chart...");

        // Function to fetch data from backend
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/users/monitoring-dashboard/top/${website_id}`); // Replace with your backend URL
                

                if(response.status === 200){

                    const newDataPoint = response.data[0].responseTime;  // Adjust based on API response
                    const newLabel = response.data[0].updatedTime;       // Date received from backend

                    setDataPoints(prevData => {
                        let updatedData = [...prevData];

                        // Remove the oldest value if array exceeds 12
                        if (updatedData.length >= 100) {
                            updatedData.reverse().pop();
                            updatedData.reverse();
                        }

                        updatedData.push(newDataPoint); // Add new response time
                        return updatedData;
                    });

                setLabels(prevLabels => {
                    let updatedLabels = [...prevLabels];

                    // Remove the oldest date if labels exceed 12
                    if (updatedLabels.length >= 100) {
                        updatedLabels.reverse().pop();
                        updatedLabels.reverse();
                    }

                    updatedLabels.push(newLabel); // Add new date
                    return updatedLabels;
                });
                }
                

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

    const chartOptions = {
        responsive: true,
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Date',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Response Time (ms)',
                },
            },
        },
    };

    return (
        <>
            <div style={{ width: '70%', margin: 'auto', display: 'block', height: '55%' }}>
                <Line
                    data={{
                        labels: labels,  // Dynamic date labels from backend
                        datasets: [{
                            label: 'Response Time',
                            data: dataPoints,  // Response times from backend
                            borderColor: '#000000',
                            backgroundColor: '#000000',
                        }]
                    }}
                    options={chartOptions}
                />
            </div>
        </>
    );
}

export default Linegraph;


// ------------Shift logic

// import React, { useEffect, useState } from "react";
// // import { Line } from "react-chartjs-2";

// function Linegraph() {
//     // State to store response times
//     const [dataPoints, setDataPoints] = useState(new Array(100).fill(0));
//     const [labels, setLabels] = useState(
//         [...Array(100)].map((_, i) => new Date(Date.now() - (11 - i) * 6000).toLocaleTimeString())
//     );

//     useEffect(() => {
//         console.log("Initializing Line Chart...");

//         // Function to simulate fetching data from backend
//         const fetchData = () => {
//             const newDataPoint = Math.floor(Math.random() * 3000); // Random response time

//             setDataPoints(prevData => {
//                 let updatedData = [...prevData];

//                 // Replace the first (oldest) value instead of shifting the whole array
//                 updatedData.shift(); // Remove first item
//                 updatedData.push(newDataPoint); // Add new data at the end
                
//                 return updatedData;
//             });

//             setLabels(prevLabels => {
//                 let updatedLabels = [...prevLabels];

//                 // Replace first label with a new timestamp (without shifting all labels)
//                 updatedLabels.shift(); // Remove first label
//                 updatedLabels.push(new Date().toLocaleTimeString()); // Add new timestamp

//                 return updatedLabels;
//             });
//         };

//         // Call fetchData every 60 seconds
//         const intervalId = setInterval(fetchData, 6000);

//         // Initial fetch with dummy data
//         fetchData();

//         // Cleanup interval on component unmount
//         return () => clearInterval(intervalId);
//     }, []);

//     const chartOptions = {
//         responsive: true,
//         scales: {
//             x: {
//                 title: {
//                     display: true,
//                     text: "Time",
//                 },
//             },
//             y: {
//                 title: {
//                     display: true,
//                     text: "Response Time (ms)",
//                 },
//             },
//         },
//     };

//     return (
//         <>
//             <div style={{ width: "70%", margin: "auto", display: "block", height: "55%" }}>
//                 <Line
//                     data={{
//                         labels: labels, // Fixed labels
//                         datasets: [{
//                             label: "Response Time",
//                             data: dataPoints, // Updating last data point without shifting graph
//                             borderColor: "#000000",
//                             backgroundColor: "#000000",
//                         }]
//                     }}
//                     options={chartOptions}
//                 />
//             </div>
//         </>
//     );
// }

// export default Linegraph;


// INfinite time saying--------------------------------------

// import React, { useEffect, useState } from "react";
// // import { Line } from "react-chartjs-2";

// function Linegraph() {
//     // Stores all fetched data
//     const [allData, setAllData] = useState([]);
//     const [allLabels, setAllLabels] = useState([]);

//     // State for filtered data
//     const [filteredData, setFilteredData] = useState([]);
//     const [filteredLabels, setFilteredLabels] = useState([]);

//     // State for selected filter (default: "7 Hours")
//     const [selectedFilter, setSelectedFilter] = useState("7h");

//     useEffect(() => {
//         console.log("Initializing Line Chart...");

//         // Function to simulate fetching data from backend
//         const fetchData = () => {
//             const newDataPoint = Math.floor(Math.random() * 3000); // Random response time
//             const newLabel = new Date().toLocaleTimeString(); // Current time as label

//             setAllData(prevData => [...prevData, newDataPoint]);
//             setAllLabels(prevLabels => [...prevLabels, newLabel]);
//         };

//         // Call fetchData every 5 minutes (for simulation)
//         const intervalId = setInterval(fetchData, 10000); // 5 minutes

//         // Initial fetch
//         fetchData();

//         // Cleanup interval on component unmount
//         return () => clearInterval(intervalId);
//     }, []);

//     // Function to filter data based on selected time range
//     useEffect(() => {
//         const now = new Date();
//         let timeLimit;

//         if (selectedFilter === "7h") {
//             timeLimit = new Date(now.getTime() - 7 * 60 * 60 * 1000); // 7 hours ago
//         } else if (selectedFilter === "1d") {
//             timeLimit = new Date(now.getTime() - 24 * 60 * 60 * 1000); // 1 day ago
//         }

//         // Filter data based on time range
//         const filteredIndexes = allLabels
//             .map((label, index) => ({ label, index }))
//             .filter(({ label }) => {
//                 const labelTime = new Date();
//                 labelTime.setHours(parseInt(label.split(":")[0]), parseInt(label.split(":")[1]));
//                 return labelTime >= timeLimit;
//             })
//             .map(({ index }) => index);

//         setFilteredData(filteredIndexes.map(i => allData[i]));
//         setFilteredLabels(filteredIndexes.map(i => allLabels[i]));
//     }, [selectedFilter, allData, allLabels]);

//     const chartOptions = {
//         responsive: true,
//         scales: {
//             x: {
//                 title: {
//                     display: true,
//                     text: "Time",
//                 },
//             },
//             y: {
//                 title: {
//                     display: true,
//                     text: "Response Time (ms)",
//                 },
//             },
//         },
//     };

//     return (
//         <>
//             <div style={{ width: "70%", margin: "auto", display: "block", height: "55%" }}>
//                 <h3>Response Time Graph</h3>

//                 {/* Dropdown for time filter */}
//                 <select onChange={(e) => setSelectedFilter(e.target.value)} value={selectedFilter}>
//                     <option value="7h">Last 7 Hours</option>
//                     <option value="1d">Last 1 Day</option>
//                 </select>

//                 <Line
//                     data={{
//                         labels: filteredLabels, // Filtered labels
//                         datasets: [{
//                             label: "Response Time",
//                             data: filteredData, // Filtered data
//                             borderColor: "#000000",
//                             backgroundColor: "#000000",
//                         }]
//                     }}
//                     options={chartOptions}
//                 />
//             </div>
//         </>
//     );
// }

// export default Linegraph;
