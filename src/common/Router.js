import React from 'react'
import { Routes,Route } from "react-router-dom";
import Login from "../components/login/Login";
import { SearchForm } from "../container/search-form/search-form";
import { Message } from './SimpleMessage';
import AdminPage from '../components/admin-page/AdminPage';
import { Navbar } from 'react-bootstrap';
import AdminHome from '../components/admin-page/AdminHome'
import UserHome from '../components/user-page/UserHome'
import BookFlight from '../components/user-page/BookFlight';
import AddAirline from '../components/admin-page/AddAirline';
import ManageAirlines from '../components/admin-page/ManageAirlines';
import FlightBooking from '../components/user-page/FlightBooking';
import ManageBooking from '../components/user-page/ManageBooking';
import BookingHistory from '../components/user-page/BookingHistory';
import Reports from '../components/admin-page/Reports'

function Router() {

    return (
        <Routes>
            <Route path ="/dashboard" element = {<SearchForm />}/>
            <Route path ="/" element = {<SearchForm />}/>
            <Route path ="/login" element = {<Login />}/>
            <Route path ="/comming-soon" element = {<Message />}/>
            <Route path ="/charters" element = {<Message />}/>
            <Route path ="/business/travels" element = {<Message />}/>
            <Route path ="/airport/taxis" element = {<Message />}/>
            <Route path ="/activities" element = {<Message />}/>
            <Route path ="/gift/cards" element = {<Message />}/>
            <Route path ="/visa" element = {<Message />}/>
            <Route path ="/offers" element = {<Message />}/>
            <Route path ="/admin/login" element = {<Login/>}/>
            <Route path ="/user/login" element = {<Login/>}/>
            <Route path ="/admin-home" element = {<AdminHome/>}/>
            <Route path ="/user-home" element = {<UserHome/>}/>
            {/* <Route path ="/logout" element = {<UserHome/>}/> */}
            <Route path ="/book-flight" element = {<FlightBooking/>}/>
            <Route path ="/manage-bookings" element = {<ManageBooking/>}/>
            <Route path ="/booking-history" element = {<BookingHistory/>}/>
            <Route path ="/add-airline" element = {<AddAirline/>}/>
            <Route path ="/manage-airlines" element = {<ManageAirlines/>}/>
            <Route path ="/reports" element = {<Reports/>}/>
        </Routes>
    )

}
export default Router;