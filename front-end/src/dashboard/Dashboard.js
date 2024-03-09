import React, { useEffect, useState } from "react";
import { listReservations, listTables, deleteTable, cancelReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import Reservations from "../reservations/Reservations";
import { useHistory, Link } from "react-router-dom";
import { today, next, previous } from "../utils/date-time";
import useQuery from "../utils/useQuery"; 

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {

  // state hooks for manage reservaton data and potential errors
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  // state hooks for managing the select date, defaulting to the date from query string or today's date
  const [dateToday, setDateToday] = useState(query.get("data") || today());

  // state hooks for managing tables data and potential errors
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);

  // state hooks for managing errors when finishing up with a table
  const [finishTableError, setFinishTableError] = useState(null);

  const history = useHistory();
  const query = useQuery();

  // useEffect hook to load dashboard data when selected date changes
  useEffect(loadDashboard, [date]);
  // useEffect hook to load the tables data when the component mounts.
  useEffect(loadTables, []);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  function loadTables() {
    const abortController = new AbortController();
    setTablesError(null);
    listTables(abortController.signal)
      .then(setTables)
      .catch(setTablesError);
    return () => abortController.abort();
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      <Reservations />
    </main>
  );
}

export default Dashboard;
