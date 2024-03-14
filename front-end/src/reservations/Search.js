import React, { useState } from "react";
import Reservations from "./Reservations"; // display all matched records on the /search page using the same reservations list component as the /dashboard page.
import { listReservations } from "../utils/api";

// search for a reservation by phone number || path: /search

function Search() {
    const [mobileNumber, setMobileNumber] = useState(""); // initialize state of mobile number

    const handleChange = (event) => {
        setMobileNumber(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
    }
    return (
        <form name="reservation-create" onSubmit={handleSubmit}>
            <div className="search">
                <h2>Search</h2>
                <label htmlFor="mobile_number">Mobile Number:</label>
                <input 
                id="mobile_number"
                name="mobile_number"
                type="text"
                required={true}
                placeholder="Enter a customer's phone number"
                maxLength="12"
                onChange={handleChange}
                />
            </div>
            <button type="submit">Find</button>
        </form>
    );
}

export default Search;