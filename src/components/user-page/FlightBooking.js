import React, { Component } from "react";
import axios from "axios";


class FlightBooking extends Component {
  constructor(props) {
    super(props)
    this.state = {
      from: '', to: '', departureDate: '', seatType: '', flightList: [], showing: false, ticketBookData: {}
    }
  }

  handleFrom = (e) => {
    this.from = e.target.value;
    const index = e.target.selectedIndex;
    const el = e.target.childNodes[index];
    const option = el.outerText;
    // this.from(option);
  }

  handleTo = (e) => {
    this.to = e.target.value;
    const index = e.target.selectedIndex;
    const el = e.target.childNodes[index];
    const option = el.outerText;
  }

  handleDepartureDate = (e) => {
    this.departureDate = e.target.value;
  }
  handleSeatType = (e) => {
    this.seatType = e.target.value;
  }
  handleSubmit = (e) => {
    console.log(this.from);
    console.log(this.to);
    console.log(this.departureDate);
    console.log(this.seatType);
    axios.get('http://localhost:8081/api/v1.0/search', { params: { from: this.from, to: this.to, departureDate: this.departureDate, seatType: this.seatType } })
      .then(response => {
        console.log(response.data);
        const flightList = response.data;
        if (flightList.length === 0) {
          alert("Sorry!! We don't have flight for this route..")
        }
        console.log(this.flightList);
        this.setState({ flightList, isLoading: false, showing: false })

      }).catch(error => {
        console.error('Error', error.response);
        alert("Invalid data entered");
      });
  }
  bookticket = (e) => {
    console.log(e);
    this.ticketBookData = e;
    this.setState({ showing: true })
    if (this.ticketBookData.seats === 0) {
      alert("Sorry, No Seats are available for selected flight!!!");
      this.setState({ showing: false })
    }
  }
  handlePassengername = (e) => {
    this.passengername = e.target.value;
  }

  handleAge = (e) => {
    this.age = e.target.value;
  }

  handleGovtId = (e) => {
    this.govtId = e.target.value;
  }

  handleGender = (e) => {
    this.gender = e.target.value;
  }

  handleEmail = (e) => {
    this.email = e.target.value;
  }

  bookFlight = () => {
    console.log(this.ticketBookData);
    // this.pnrGenerate="PNR"+(new Date).getUTCMilliseconds()+(new Date).getUTCMinutes()+(new Date).getUTCHours();
    //console.log(this.pnrGenerate)
    axios.post('http://localhost:8081/api/v1.0/flight/booking', {
      pnr: "4",
      flightNumber: this.ticketBookData.flight_Number,
      date: this.ticketBookData.start_Date_Time,
      fromPlace: this.ticketBookData.from_Place,
      toPlace: this.ticketBookData.to_Place,
      cost: this.ticketBookData.cost,
      name: this.passengername,
      emailID: this.email,
      noOfSeatsToBook: this.govtId,
      gender: this.gender,
      age: this.age,
      mealType: this.ticketBookData.meal
    })
      .then(response => {
        console.log(response.data);
        alert("your flight has been booked successfully..");
      }).catch(error => {
        alert("Invalid data..");
       });
    //            if(response.status===200){

    //             console.log(this.ticketBookData.id);
    //             alert('Flight has been booked successfully');
    //             this.setState({showing: false }) 
    //             window.location.reload();
    //            }
    //        }).catch(error => {
    // //         //  if (error.response.status === 401) setError(error.response.data.message);
    // //         //  else setError("Something went wrong. Please try again later.");
    //        }); 
  }


  renderTableHeader = () => {
    return Object.keys(this.state.flightList[0]).map(attr => <th style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa", 'borderStyle': 'solid' }} key={attr}>{attr.toUpperCase()}</th>)
  }

  renderTableRows = () => {
    return this.state.flightList.map(flight => {
      return (
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
          <td><button onClick={(e) => this.bookticket(flight)}>Book</button></td>
        </tr>
      )
    })
  }

  render() {
    const { flightList, showing, isError } = this.state
    return (
      <div>
        <h1>Book flight</h1>
        <div>
          <label className="label">Source</label>
          {/* <input onChange={this.handleFrom} value={this.from} type="text" required/>   */}
          <select className='selectStyle' className="textboxPadding" id='fplace' onChange={this.handleFrom} value={this.from} required>
          <option value="Select" selected defaultValue>Select</option>
            <option value="Pune (PNQ)">Pune (PNQ)</option>
            <option value="Delhi (DEL)">Delhi (DEL)</option>
            <option value="Bengaluru (BLR)">Bengaluru (BLR)</option>
            <option value="Mumbai (BOM)">Mumbai (BOM)</option>
          </select>
        </div>
        <div>
          <label className="label">Destination</label>
          {/* <input onChange={this.handleTo} value={this.to} type="text" required /> */}
          <select className='selectStyle' className="textboxPadding" id='tplace' onChange={this.handleTo} value={this.to} required>
          <option value="Select" selected defaultValue>Select</option>
            <option value="Pune (PNQ)">Pune (PNQ)</option>
            <option value="Delhi (DEL)">Delhi (DEL)</option>
            <option value="Bengaluru (BLR)">Bengaluru (BLR)</option>
            <option value="Mumbai (BOM)">Mumbai (BOM)</option>
          </select>
        </div>
        <div>
          <label className="label">Date</label>
          <input onChange={this.handleDepartureDate} value={this.departureDate} type="date" className="textboxPadding" required />
        </div>
        <div>
          <label className="label">Seat Type</label>
          <input onChange={this.handleSeatType} value={this.seatType} type="text" className="textboxPadding" required />
        </div>
        <input type="button" onClick={(e) => this.handleSubmit(e)} value="Search" />
        <div>
          <table style={{ "borderWidth": "5px", 'marginInline': "auto", 'borderColor': "#00000", 'borderStyle': 'solid' }}>
            <thead>
              <tr>
                {flightList.length > 0 && this.renderTableHeader()}
              </tr>
            </thead>
            <tbody>
              {flightList.length > 0 && this.renderTableRows()}
            </tbody>
          </table>
        </div>

        <br></br>
        {showing
          ? <div>
            <form>
              {/* Labels and inputs for form data */}
              <label className="label">Passenger Name </label>
              <input onChange={this.handlePassengername} className="input"
                value={this.passengername} type="text" required/>

              <label className="label" className="text-padding">Age </label>
              <input onChange={this.handleAge} className="input"
                value={this.age} type="text" required/>

              <label className="label" className="text-padding">No. Of Seats </label>
              <input onChange={this.handleGovtId} className="input"
                value={this.govtId} type="text" required/>

              <label className="label" className="text-padding">Gender </label>
              <input onChange={this.handleGender} className="input"
                value={this.gender} type="text" required/>

              <label className="label" className="text-padding">
               Email ID </label>
              <input onChange={this.handleEmail} className="input"
                value={this.email} type="text" required/>
              <br></br>
              <input className="search" type="button" onClick={this.bookFlight} value="Book Ticket" />
            </form>
          </div>
          : null
        }
      </div>
    )
  }
}
export default FlightBooking;