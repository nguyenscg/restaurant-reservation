import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { readReservation, updateReservation } from "../utils/api";
import ReservationForm from "./ReservationForm";

function ReservationEdit() {
    const {reservation_id} = useParams();

    const [reservation, setReservation] = useState({});
    const history = useHistory();

    useEffect(() => {
        const getReservation = async () => {
            const response = await readReservation(reservation_id);
            setReservation(response);
        }
        getReservation();
    }, [reservation_id]);

    // handle changes made to input field
    const handleChange = ({ target }) => {
        setReservation({
            ...reservation,
            [target.name]: target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        await updateReservation(reservation);
        history.push(`/dashboard/${reservation.reservation_date}`)
    }

    return (
        <div className="reservation-edit">
            <h1>Edit Reservation:</h1>
            <ReservationForm
                formData={reservation}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />
            <div>
                <button type="btn" onClick={() => history.push("/")}>Cancel</button>
                <button type="submit" onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    )
}

export default ReservationEdit;