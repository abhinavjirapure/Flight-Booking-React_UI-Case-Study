import React, { Component, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const BookingHistory = () => {

    const [emailId, setemailId] = useState('');
    const [airLineData, setairLineData] = useState([]);
    const handleEmailIdSearch = (e) => {
        setemailId(e.target.value);
    }

    const searchBooking = (e) => {
        e.preventDefault();
        const requestModel = {
            emailId
        }
        axios.get("http://localhost:8081/api/v1.0/flight/tickets/" + requestModel.emailId)
            .then(res => {
                console.log(res.data);
                console.log("res", res);
                if (res.status === 200) {
                   // const data = [res.data]
                    setairLineData(res.data);
                    console.log(requestModel.emailId);
                    // if(res.data.emailID === 'null')
                    // {
                    //  alert("Enter valid Email Id");
                    // }
                }
            }).catch(error => {
                console.log("res", error);
                alert("Invalid Email Id..");
                //backToSamePage();
            });      
    }

    return (
        <div>
            <form action="/" method="get">
            <h1>Manage Your Airlines</h1>
            <label htmlFor="header-search">
                <span className="visually-hidden"></span>
            </label>
            <input onChange={handleEmailIdSearch} value={emailId}
                type="text"
                id="header-search"
                placeholder="Enter registered email ID"
                name="s"
                required
            />
            <button onClick={(e) => searchBooking(e)} type="submit">Search</button>
            </form>
            <div>
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Email ID</th>
                            <th scope="col">PNR</th>
                            <th scope="col">Name</th>
                            <th scope="col">Age</th>
                            <th scope="col">DOJ</th>
                            <th scope="col">Gender</th>
                            <th scope="col">Flight No</th>
                            <th scope="col">From</th>
                            <th scope="col">To</th>
                            <th scope="col">Price</th>
                            <th scope="col">Meal</th>
                            <th scope="col">No Of Seats</th>
                            {/* <th scope="col">Action</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {airLineData.map(flight =>
                            <tr>
                                <td>{flight.emailID}</td>
                                <td>{flight.pnr}</td>
                                <td>{flight.name}</td>
                                <td>{flight.age}</td>
                                <td>{flight.date}</td>
                                <td>{flight.gender}</td>
                                <td>{flight.flight_Number}</td>
                                <td>{flight.from_Place}</td>
                                <td>{flight.to_Place}</td>
                                <td>{flight.price}</td>
                                <td>{flight.mealType}</td>
                                <td>{flight.no_Of_Seats_To_Book}</td>
                                {/* <td><button type="button" class="btn btn-success">View</button></td> */}
                            </tr>

                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default BookingHistory;