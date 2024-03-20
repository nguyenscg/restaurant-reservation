import React, { useState, useEffect } from "react";
import { listReservations } from "../utils/api";
import { Link } from "react-router-dom";

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
        <table className="table table-striped">
            <thead className="thead-dark">
                <tr>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Mobile Number</th>
                    <th scope="col">Reservation Date</th>
                    <th scope="col">Reservation Time</th>
                    <th scope="col">People</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Seat?</th>
                </tr>
            </thead>
            <tbody>
                {reservations.map((reservation) => (
                    <tr key={reservation.reservation_id}>
                        <td>{reservation.first_name}</td>
                        <td>{reservation.last_name}</td>
                        <td>{reservation.mobile_number}</td>
                        <td>{reservation.reservation_date}</td>
                        <td>{reservation.reservation_time}</td>
                        <td>{reservation.people}</td>
                        <td><Link to={`/reservations/${reservation.reservation_id}/edit`} className="btn btn-secondary">Edit</Link></td>
                        <td><button className="btn btn-secondary">Seat</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default Reservations;