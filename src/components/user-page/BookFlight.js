import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Typeahead } from 'react-bootstrap-typeahead';
import { connect } from 'react-redux';
// import '../components/container/search-form/search-form.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { findFlights } from './../../actions';
import NavBar from '../../common/NavBar';
import searchForm, { SearchForm } from '../../container/search-form/search-form';


function BookFlight(props) {

  const airports = [
    'Pune (PNQ)',
    'Delhi (DEL)',
    'Bengaluru (BLR)',
    'Mumbai (BOM)',
    //   'Chennai (CHE)',
    //   'Kolkata (KOL)',
    //   'Ahmdhabad (AHD)',
    //   'Nagpur (NAG)'
  ];

  let origin, destination;
  const [isReturn, setFlightType] = useState(false);
  const [status, setFormValid] = useState({ isValid: false });
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departureDate, setDateOfDept] = useState("");
  const [seatType, setSeatType] = useState("");
  let invalidFields = {};

  const isDate = (date) => {
    return (new Date(date) !== "Invalid Date") && !isNaN(new Date(date));
  }

  const ErrorLabel = (props) => {
    return (<label style={{ color: 'red' }}>{props.message}</label>)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const { flights } = props;
    invalidFields = {};
    const criteria = {
      // origin: origin.state.text,
      // destination: destination.state.text,
      // departureDate: event.target.dateOfDep.value,
      // numOfPassengers: event.target.numOfPassengers.value
      from, to, departureDate, seatType
    }

    if (event.target.flightType[1].checked) {
      criteria.returnDate = event.target.dateOfReturn.value;
      if (!isDate(event.target.dateOfReturn.value)) {
        invalidFields.returnDate = true;
      }
    }

    if (!airports.includes(criteria.origin)) {
      invalidFields.origin = true;
    }
    if (!airports.includes(criteria.destination) || criteria.origin === criteria.destination) {
      invalidFields.destination = true;
    }
    if (!isDate(criteria.departureDate)) {
      invalidFields.departureDate = true;
    }
    if (!isDate(criteria.departureDate)) {
      invalidFields.departureDate = true;
    }
    if (Object.keys(invalidFields).length > 0) {
      setFormValid({ isValid: false, ...invalidFields });
      return;
    }

    setFormValid({ isValid: true });
    props.findFlights({ flights, criteria });

    const searchFlights = (e) => {
      e.preventDefault();
      const requestModel = {
        params: { from, to, departureDate, seatType }
      }
      const axios = require('axios')
      axios.get("http://localhost:8081/api/v1.0/search", requestModel)
        .then(res => {
          console.log("res", res);
          if (res.status === 200) {
            console.log("Flight search result");
          }
        }).catch(error => {
          console.log("res", error);
          alert("Invalid Request Model");
        })

    }

    return (
      <div>
        <div className="detail-label">
          <h1>Book Flight...</h1>
          {/* <Button variant="primary" type="submit" className="button">
     Back
    </Button> */}
        </div>
        {/* <NavBar/> */}
        <Card>
          <Card.Body>
            <Form className="search-form-container" >
              <div className="auth-inner">
                <Form.Group >
                  <Form.Check
                    inline
                    checked={!isReturn}
                    type="radio"
                    label="One way"
                    name="flightType"
                    id="formHorizontalRadios1"
                    onChange={(e) => setFlightType(false)}
                  />
                  <Form.Check
                    inline
                    checked={isReturn}
                    type="radio"
                    label="Round trip"
                    name="flightType"
                    id="formHorizontalRadios2"
                    onChange={(e) => setFlightType(true)}
                  />
                </Form.Group>

                <Form.Group controlId="formGridOrigin">
                  <Typeahead
                    labelKey="origin"
                    options={airports}
                    placeholder="From"
                    ref={(ref) => origin = ref}
                  />
                  {status.origin && <ErrorLabel message="Please enter a valid airport"></ErrorLabel>}
                </Form.Group>

                <Form.Group controlId="formGridDestination">
                  <Typeahead
                    labelKey="destination"
                    options={airports}
                    placeholder="To"
                    ref={(ref) => to = ref}
                  />
                  {status.destination && <ErrorLabel message="Please enter a valid airport but not same as origin"></ErrorLabel>}
                </Form.Group>

                <Form.Group controlId="formGridDateOfDep">
                  <Form.Label>Departure Date</Form.Label>
                  <Form.Control type="date" name="dateOfDep" placeholder="yyyy-mm-dd" required />
                  {status.departureDate && <ErrorLabel message="Please enter a valid departure date"></ErrorLabel>}
                </Form.Group>

                {isReturn && <Form.Group controlId="formGridDateOfReturn">
                  <Form.Label>Return Date</Form.Label>
                  <Form.Control type="date" name="dateOfReturn" placeholder="yyyy-mm-dd" required />
                  {status.returnDate && <ErrorLabel message="Please enter a valid return date"></ErrorLabel>}
                </Form.Group>}

                <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Control as="select" name="numOfPassengers" placeholder="Number of Passengers">
                    <option>Number of Seats</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit" onClick={(e) => searchFlights(e)}>
                  Search Flight
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </div>
    )
  }
  return (
    <SearchForm to = {to} from ={from} departureDate = {departureDate} seatType = {seatType}/>
  )
}
export default BookFlight;
