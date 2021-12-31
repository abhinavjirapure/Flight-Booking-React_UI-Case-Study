import React, { Component, useState } from "react";
//import "../components/admin-page/ManageAirlines.css";
import axios from "axios";
import { useNavigate } from "react-router";

const ManageBooking = () => {

const [bookingPnr, setBookingPnr] = useState('');
//const [airLineStatus, setairLineStatus] = useState('');
const [airLineData, setairLineData] = useState([]);
const handlePnrSearch = (e) => {
    setBookingPnr(e.target.value);
}

let navigate = useNavigate();
const backToSamePage = ()=> {
        navigate("/manage-bookings");
}

const pnrSearch = (e) => {
    e.preventDefault();
    const requestModel = {
        bookingPnr
    }
    axios.get("http://localhost:8081/api/v1.0/flight/ticket/" + requestModel.bookingPnr)
        .then(res => {
            console.log(res.data);
            console.log("res", res);
            if (res.status === 200) {
                const data = [res.data]
                setairLineData(data);
                console.log(requestModel.bookingPnr);
            }
        }).catch(error => {
            console.log("res", error);
            alert("Invalid PNR Number..");
            backToSamePage();
        });      
}

const cancelBooking = (e) => {
    
    axios.delete("http://localhost:8081/api/v1.0/flight/cancel/" +e)
        .then(res => {
            console.log(res.data);
            console.log("res", res);
            if (res.status === 200) {
            alert("Your flight booking has been cancel successfully..")
            }
        }).catch(error => {
            console.log("res", error);
            alert("Invalid PNR Number..");
        });
    }
return (
<div>
<h1>User Manage Bookings</h1>
<form action="/" method="get">
            <label htmlFor="header-search">
                <span className="visually-hidden"></span>
            </label>
            <input onChange={handlePnrSearch} value={bookingPnr}
                type="text"
                id="header-search"
                placeholder="Enter PNR Number"
                name="s"
                required
            />
            <button onClick={(e) => pnrSearch(e)} type="submit">Search</button>
            <div>
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">PNR</th>
                            <th scope="col">Name</th>
                            <th scope="col">Age</th>
                            <th scope="col">DOJ</th>
                            <th scope="col">Email ID</th>
                            <th scope="col">Gender</th>
                            <th scope="col">Flight No</th>
                            <th scope="col">From</th>
                            <th scope="col">To</th>
                            <th scope="col">Price</th>
                            <th scope="col">Meal</th>
                            <th scope="col">No Of Seats</th>
                            {/* <th scope="col">Action1</th> */}
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(airLineData) && airLineData.map(flight =>
                            <tr>
                                <td>{flight.pnr}</td>
                                <td>{flight.name}</td>
                                <td>{flight.age}</td>
                                <td>{flight.date}</td>
                                <td>{flight.emailID}</td>
                                <td>{flight.gender}</td>
                                <td>{flight.flight_Number}</td>
                                <td>{flight.from_Place}</td>
                                <td>{flight.to_Place}</td>
                                <td>{flight.price}</td>
                                <td>{flight.mealType}</td>
                                <td>{flight.no_Of_Seats_To_Book}</td>
                                {/* <td><button type="button" class="btn btn-success">Download</button></td> */}
                                <td><button type="button" class="btn btn-success" onClick={(e) => cancelBooking(flight.pnr)}>Cancel</button></td>
                            </tr>

                        )}
                    </tbody>
                </table>
            </div>
        </form>
</div>
);

}
export default ManageBooking;