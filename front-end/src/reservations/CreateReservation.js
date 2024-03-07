// path should be: /reservations/new

import React, { useState } from "react"; // import React and useState hook
import { useHistory } from "react-router-dom"; // import useHistory hook

function CreateReservation() {
    // inputs: first_name, last_name, mobile_number, reservation_date, reservation_time, people
    // display a submit button that when clicked, saves new reservation, then displays the /dashboard page for the date of the new reservation
    // display a cancel button that, when the button is clicked, returns the user to the previous page
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
}

export default CreateReservation;