// path should be: /reservations/new

import React, { useState } from "react"; // import React and useState hook
import { useHistory } from "react-router-dom"; // import useHistory hook

function CreateReservation() {
    // inputs: first_name, last_name, mobile_number, reservation_date, reservation_time, people
    // display any error messages returned from API
    const initialState = { // initialState with all empty fields
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time: "",
        people: 0,
    }
    const [reservation, setReservation] = useState(null); // initalize state of reservation
    const history = useHistory();

    // display a submit button that when clicked, saves new reservation, then displays the /dashboard page for the date of the new reservation
    const handleSubmit = (event) => {
        event.preventDefault();
    }

    // display a cancel button, when button is clicked, returns user to previous page
    const handleCancel = (event) => {
        history.push("/");
    }

    return (
        <div>
            <h1>Create Reservation:</h1>
            <form>
                <div className="form-group">
                    <label htmlFor="first_name">First name</label>
                    <input name="first_name" type="text"></input>
                </div>
            </form>
            <button type="btn">Submit</button>
        </div>
    )
}

export default CreateReservation;