import React, { Component } from "react";
import Alert from 'react-bootstrap/Alert';
import { Card, Dropdown, DropdownButton, Form, FormSelect, InputGroup, NavDropdown } from 'react-bootstrap';
import axios from "axios";
import { useNavigate } from "react-router";
import './AdminPage.css';

class AddAirline extends Component {

    constructor(props) {
       super(props)
       this.state ={
        airLineNumber:'',airLineName:'',airLineStatus:'',flightNumber:'',fromPlace:'',toPlace:'',flightCost:'',startTime:'',
        endTime:'',instrumentUsed:'',mealType:''
       }
    }

    handleairlineNumber = (e) => {
        this.airLineNumber=e.target.value;
    }

    handleairlineName = (e) => {
        this.airLineName=e.target.value;
    }

    handleFlightNumber = (e) => {
        this.flightNumber=e.target.value;
    }

    handleairlineStatus = (e) => {
        this.airLineStatus=e.target.value;
    }

    handleFromPlace = (e) => {
        this.fromPlace=e.target.value;
        const index = e.target.selectedIndex;
        const el = e.target.childNodes[index];
        const option = el.outerText;
    }

    handleToPlace = (e) => {
        this.toPlace=e.target.value;
        const index = e.target.selectedIndex;
        const el = e.target.childNodes[index];
        const option = el.outerText;
    }

    handleFlightCost = (e) => {
        this.flightCost=e.target.value;
    }

    handleStartTime = (e) => {
        this.startTime=e.target.value;
    }

    handleEndTime = (e) => {
        this.endTime=e.target.value;
    }

    handleInstrumentUsed = (e) => {
        this.instrumentUsed=e.target.value;
    }

    handleMealType = (e) => {
        this.mealType=e.target.value;
    }

    handlePassengername=(e)=>{
        this.passengername=e.target.value;
      }
    
      handleAge=(e)=>{
        this.age=e.target.value;
      }
    
      handleGovtId=(e)=>{
        this.govtId=e.target.value;
      }
    handleSubmit = (e) => {
        console.log(this.airLineNumber);
        console.log(this.airLineName);
        console.log(this.airLineStatus);
        console.log(this.flightNumber);
        console.log(this.fromPlace);
        console.log(this.toPlace);
        console.log(this.flightCost);
        console.log(this.startTime);
        console.log(this.endTime);
        console.log(this.instrumentUsed);
        console.log(this.mealType);
        e.preventDefault();
        var formData = new FormData();
        formData = {
        "airLineNumber": this.airLineNumber,
        "airLinestatus": this.airLineStatus,
        "flightNumber": this.flightNumber,
        "airLineName": this.airLineName,
        "fromPlace": this.fromPlace,
        "toPlace": this.toPlace,
        "price": this.flightCost,
        "startDateTime": this.startTime,
        "endDateTime": this.endTime,
        "instrumentUsed": this.instrumentUsed,
        "meal": this.mealType
        }
        const axios = require('axios');
        axios({
            method: 'post',
            headers: { "Accept": "application/json", "content-type": "application/json"},
            url:'http://localhost:8081/api/v1.0/create/airlines',
            data: JSON.stringify(formData)
        }).then((res) =>{ 
            console.log(res.status);
            if(res.status===200)
            {
            console.log(res);
            alert("Flight added successfully..")
            }
        }).catch(error=>{
            console.error('Error',error.response);
            alert("Invalid data entered");
        });
    }
    bookticket=(e)=>{
        console.log(e);
        this.ticketBookData=e;
        this.setState({showing: true })
        if(this.ticketBookData.seats===0){
          alert("Sorry, No Seats are available for selected flight!!!");
          this.setState({showing: false })
        }
      }
       
    render() {

        return (
           <div> 
           <h1>Add Airlines Page</h1>
           {/* <h6> <input type="button" value="Back"/> </h6> */}
            <Form>
            <div>
            <div>
            <label className="label tex">Airline Number</label>
            <input onChange={this.handleairlineNumber} value={this.airLineNumber} type="text" className="textboxPadding" required/> 
            </div>
            <label className="label">Airline Name</label>
            <input onChange={this.handleairlineName} value={this.airLineName} type="text" className="textboxPadding" required/>  
            </div>
            <div>
            <label className="label">Airline Status</label>
            <input onChange={this.handleairlineStatus} value={this.airLineStatus} type="text" className="textboxPadding" required/>  
            </div>
            <div>
            <label className="label">Flight Number</label>
            <input onChange={this.handleFlightNumber} value={this.flightNumber} type="text" className="textboxPadding" required/>  
            </div>
            <div>
            <label className="label">From Place</label>
            {/* <input onChange={this.handleFromPlace} value={this.fromPlace} type="text" required/> */}
            <select className='textboxPadding' id='fplace' onChange={this.handleFromPlace} value={this.fromPlace} required>
            <option value="Select" selected defaultValue>Select</option>
            <option value="Pune (PNQ)">Pune (PNQ)</option>
            <option value="Delhi (DEL)">Delhi (DEL)</option>
            <option value="Bengaluru (BLR)">Bengaluru (BLR)</option>
            <option value="Mumbai (BOM)">Mumbai (BOM)</option>
          </select>
            </div>
            <div>
            <label className="label">To Place</label>
            {/* <input onChange={this.handleToPlace} value={this.toPlace} type="text" required/> */}
            <select className='textboxPadding' id='tplace' onChange={this.handleToPlace} value={this.toPlace} required>
            <option value="Select" selected defaultValue>Select</option>
            <option value="Pune (PNQ)">Pune (PNQ)</option>
            <option value="Delhi (DEL)">Delhi (DEL)</option>
            <option value="Bengaluru (BLR)">Bengaluru (BLR)</option>
            <option value="Mumbai (BOM)">Mumbai (BOM)</option>
          </select>  
            </div>
            <div>
            <label className="label">Flight Cost</label>
            <input onChange={this.handleFlightCost} value={this.flightCost} type="text" className="textboxPadding" required/>  
            </div>
            <div>
            <label className="label">Start Time</label>
            <input onChange={this.handleStartTime} value={this.startTime} type="date" className='textboxPadding' required/>  
            </div>
            <div>
            <label className="label">End Time</label>
            <input onChange={this.handleEndTime} value={this.endTime} type="date" className='textboxPadding' required/>  
            </div>
            <div>
            <label className="label">Instrument Used</label>
            <input onChange={this.handleInstrumentUsed} value={this.instrumentUsed} type="text" className="textboxPadding" required/>  
            </div>
            <div>
            <label className="label">Meal Type</label>
            <input onChange={this.handleMealType} value={this.mealType} type="text" className="textboxPadding" required/>  
            </div>
            <input type="button" onClick={(e)=>this.handleSubmit(e)} value="Add Airline"/> 
            </Form>
            </div>
        )
    }

}
export default AddAirline;