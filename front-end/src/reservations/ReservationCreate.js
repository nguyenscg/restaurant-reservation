// path should be: /reservations/new

import React, { useState } from "react"; // import React and useState hook
import { createReservation } from "../utils/api"; // import createReservation function
import { useHistory } from "react-router-dom"; // import useHistory hook
import ReservationForm from "./ReservationForm"; // import Reservation form component
import ErrorAlert from "../layout/ErrorAlert";

function ReservationCreate() {
    // inputs: first_name, last_name, mobile_number, reservation_date, reservation_time, people
    // display any error messages returned from API
    const initialFormData = { // initialState with all empty fields
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time: "",
        people: "",
    }
    const [formData, setFormData] = useState({...initialFormData}); // initalize state of reservation
    const history = useHistory();
    const [reservationError, setReservationError] = useState(null); // initialize state for reservation error

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
        const reservationData = {
            ...formData,
            people: Number(formData.people),
        };
        createReservation(reservationData)
            .then((newReservation) =>
            history.push(`/dashboard?date=${newReservation.reservation_date}`)
            )
            .catch((error) => {
                setReservationError(error);
            })
    };

    return (
        <div className="reservation-new">
            <h1>Create Reservation:</h1>
            <ErrorAlert error={reservationError} />
            <ReservationForm
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />
            <div>
                <button type="button" onClick={() => history.push("/")}>Cancel</button>
                <button type="submit" onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    )
}

export default ReservationCreate;