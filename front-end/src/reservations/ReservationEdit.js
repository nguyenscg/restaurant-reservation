import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

function ReservationEdit() {

    const [reservation, setReservation] = useState({});

    const initialFormData = {
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time: "",
        people: 0,
    }

    const [formData, setFormData] = useState({ ...initialFormData });

    // handle changes made to input field
    const handleChange = ({ target }) => {
        setReservation({
            ...reservation,
            [target.name]: target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        history.push(`/reservations/${reservation.id}`)
    }

    return (
        <div className="reservation-edit">
            <h1>Edit Reservation:</h1>
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

export default ReservationEdit;