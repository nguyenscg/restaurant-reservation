import React, { useState, useEffect } from "react";
import { listReservations } from "../utils/api";

function Reservations() {
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        const fetchList = async () => {
            const abortController = new AbortController();
            try {
                const response = await listReservations(abortController.signal);
                setReservations(response);
            }
            catch(error) {
                console.log("Error fetching list", error);
            }
            return () => {
                abortController.abort();
            }
        }
        fetchList();
    }, []);


    return (
        <div>
            <h2>Reservations List</h2>
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Mobile Number</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>People</th>
                    </tr>
                </thead>
                <tbody>
                    {reservations.map(reservation => (
                        <tr key={reservation.id}>
                            <td>{reservation.first_name}</td>
                            <td>{reservation.last_name}</td>
                            <td>{reservation.mobile_number}</td>
                            <td>{reservation.reservation_date}</td>
                            <td>{reservation.reservation_time}</td>
                            <td>{reservation.people}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Reservations;