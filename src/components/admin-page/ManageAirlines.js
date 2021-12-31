import React, { Component, useState } from "react";
import './ManageAirlines.css';
import axios from "axios";

const ManageAirlines = () => {
    const [airLineNumber, setairLineNumber] = useState('');
    const [airLineStatus, setairLineStatus] = useState('');
    const [airLineData, setairLineData] = useState([]);
    const handleairlineNumberSearch = (e) => {
        setairLineNumber(e.target.value);
    }

    const flightSearch = (e) => {
        e.preventDefault();
        const requestModel = {
            airLineNumber
        }
        axios.get("http://localhost:8081/api/v1.0/flight/search/" + requestModel.airLineNumber)
            .then(res => {
                console.log(res.data);
                console.log("res", res);
                if (res.status === 200) {
                    setairLineData(res.data);
                    console.log(requestModel.airLineNumber);
                }
            }).catch(error => {
                console.log("res", error);
                alert("Invalid AirLine Number");
            });      
    }
    const flightStatus = (e) => {
        axios.put("http://localhost:8081/api/v1.0/flight/update/Status/" +airLineNumber+"/"+e)
            .then(res => {
                console.log(res.data);
                console.log("res", res);
                if (res.status === 200) {
                alert("Airline status updated successfully...")
                }
            }).catch(error => {
                console.log("res", error);
                alert("Invalid AirLine Number");
            });

}
    return (
        <form action="/" method="get">
            <h1>Manage Your Airlines</h1>
            <label htmlFor="header-search">
                <span className="visually-hidden"></span>
            </label>
            <input onChange={handleairlineNumberSearch} value={airLineNumber}
                type="text"
                id="header-search"
                placeholder="Enter Airline Number"
                name="s"
                required
            />
            <button onClick={(e) => flightSearch(e)} type="submit">Search</button>
            <div>
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Airline Number</th>
                            <th scope="col">Status</th>
                            <th scope="col">Flight Number</th>
                            <th scope="col">Name</th>
                            <th scope="col">Source</th>
                            <th scope="col">Dest</th>
                            <th scope="col">Price</th>
                            <th scope="col">Arrival</th>
                            <th scope="col">Depart</th>
                            <th scope="col">Instrument</th>
                            <th scope="col">Meal</th>
                            <th scope="col">Action1</th>
                            <th scope="col">Action2</th>
                        </tr>
                    </thead>
                    <tbody>
                        {airLineData.map(flight =>
                            <tr>
                                <td>{flight.air_Line_Number}</td>
                                <td>{flight.air_Line_status}</td>
                                <td>{flight.flight_Number}</td>
                                <td>{flight.air_Line_Name}</td>
                                <td>{flight.from_Place}</td>
                                <td>{flight.to_Place}</td>
                                <td>{flight.cost}</td>
                                <td>{flight.start_Date_Time}</td>
                                <td>{flight.end_Date_Time}</td>
                                <td>{flight.instrument_Used}</td>
                                <td>{flight.meal}</td>
                                <td><button type="button" class="btn btn-success" onClick={(e) => flightStatus("Active")}>Active</button></td>
                                <td><button type="button" class="btn btn-success" onClick={(e) => flightStatus("Block")}>Block</button></td>
                            </tr>

                        )}
                    </tbody>
                </table>
            </div>
        </form>

    );
}

export default ManageAirlines;