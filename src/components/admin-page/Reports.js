import React, { Component, useState } from "react";
import './ManageAirlines.css';
import axios from "axios";

const Reports = () => {

return(
<div>
    <h1>Reports</h1>
    <div>
    <details>
  <summary><h3>About Us</h3></summary>
  <p><h4>Wherever you want to go and whatever you want to do, airpeace.com makes it easy and supports you with 24/7 customer support.</h4></p>
  </details>
  <details>
  <summary><h3>Incredible Selection</h3></summary>
  <p><h4>Whether you want to stay in a chic city apartment, a luxury beach resort, or a cozy B&B in the countryside, airpeace.com gives you amazing diversity and variety of choice – all in one place.</h4></p>
  </details>
  <details>
  <summary><h3>Low Rates</h3></summary>
  <p><h4>Our airpeace.com guarantees to offer you the best available rates. And with our promise to price match, you can rest assured that you’re always getting a great deal.</h4></p>
  </details>
  <details>
  <summary><h3>Instant Confirmation</h3></summary>
  <p><h4>At airpeace.com, every reservation is instantly confirmed. When you find your perfect stay, a few clicks are all it takes.</h4></p>
  </details>
  <details>
  <summary><h3>Secure Booking</h3></summary>
  <p><h4>We facilitate hundreds of thousands of transactions every day through our secure platform and work to the highest standards to guarantee your privacy. For more details, check our Privacy Statement.</h4></p>
  </details>
  <details>
  <summary><h3>24/7 Support</h3></summary>
  <p><h4>Whether you’ve just booked or are already enjoying your trip, our Customer Experience Team is available around the clock to answer your questions and advocate on your behalf in more than 40 languages. Make sure to check out our FAQs for travelers.</h4></p>
  </details>
  </div>
</div>
);
}
export default Reports;