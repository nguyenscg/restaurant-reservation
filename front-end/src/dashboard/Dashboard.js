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
  const history = useHistory();
  const query = useQuery();

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

  // handler for next day
  const handleNext = (event) => {
    event.preventDefault();
    history.push("/dashboard");
    setDateToday(next(dateToday));
  }

  // handler for today
  const handleToday = (event) => {
    event.preventDefault();
    history.push("/dashboard");
    setDateToday(date);
  }


// handler for previous day
  const handlePrev = (event) => {
    event.preventDefault();
    history.push("/dashboard");
    setDateToday(previous(dateToday));
  }

  // handler for finish table
  const handleFinish = (tableId) => {
    if (window.confirm("Finish this table?")) {
      finishTableError(tableId)
        .then(() => {
          loadTables();
        })
        .catch(setFinishTableError);
    }
  };

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for {dateToday}</h4>
      </div>
      <div>
        <button onClick={handlePrev}>Previous Date</button>
        <button onClick={handleToday}>Today</button>
        <button onClick={handleNext}>Next Date</button>
      </div>
      <ErrorAlert error={reservationsError} />
      <h2>Reservations</h2>
      <Reservations
        reservations={reservations} 
      />
      <h2>Tables</h2>
      <ErrorAlert error={tablesError || finishTableError} />
      {tables.map((table) => (
        <div className="row border m-3" key={table.table_id}>
          <p className="col-3 m-2">{table.table_name}</p>
          <p className="col-3 m-2">Capacity: {table.capacity}</p>
          {table.reservation_id === null ? (
            <p className="m-2" id={`data-table-id-status=${table.table_id}`}>Status: Free</p>
          ) : (
            <p className="m-2" id={`data-table-id-status=${table.table_id}`}>Status: Occupied</p>
          )}
          {table.reservation_id !== null && (
            <button type="button" className="btn btn-primary ml-3 m-2" data-table-id-finish={table.table_id} onClick={() => {handleFinish(table.table_id);}}>Finish</button>
          )}
        </div>
      ))}
    </main>
  );
}

export default Dashboard;
