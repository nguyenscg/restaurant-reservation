// path should be: /reservations/new

import React, { useState } from "react"; // import React and useState hook
import { useHistory } from "react-router-dom"; // import useHistory hook
import ReservationForm from "./ReservationForm"; // import Reservation form component

function ReservationCreate() {
    // inputs: first_name, last_name, mobile_number, reservation_date, reservation_time, people
    // display any error messages returned from API
    const initialFormData = { // initialState with all empty fields
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time: "",
        people: 0,
    }
    const [formData, setFormData] = useState({...initialFormData}); // initalize state of reservation
    const history = useHistory();

    // handle changes made to inputs so they can correctly be submitted
    const handleChange = ({ target }) => {
        setFormData({
            ...formData,
            [target.name]: target.value,
        });
    };

    // display a submit button that when clicked, saves new reservation, then displays the /dashboard page for the date of the new reservation
    const handleSubmit = (event) => {
        event.preventDefault();
        setReservation({ ...initialFormData });
    }

    // display a cancel button, when button is clicked, returns user to previous page
    const handleCancel = (event) => {
        history.push("/");
    }

    return (
        <div className="reservation-new">
            <h1>Create Reservation:</h1>
            <ReservationForm
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />
            <div>
                <button type="btn" onClick={() => history.push("/")}></button>
                <button type="submit" onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    )
}

export default ReservationCreate;