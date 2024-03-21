import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { listTables, readReservation, updateTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function ReservationSeat() {
    const { reservation_id } = useParams();
    const history = useHistory();
    const [tables, setTables] = useState([]);
    const [error, setError] = useState(null);
    const [tableId, setTableId] = useState("");

    // load all tables and add these tables to dropdown
    useEffect(() => {
        const abortController = new AbortController();
        setError(null);
        async function loadTables() {
            try {
                const response = await listTables(abortController.signal);
                setTables(response)
            } catch (error) {
                setError(error)
            }
        }
        loadTables()
        return () => abortController.abort();
    }, []);

    const changeHandler = (event) => {
        setTableId(event.target.value);
    }
    
    const handleSubmit = (event) => {
        event.preventDefault()
        const abortController = new AbortController();
        updateTable(Number(tableId), reservation_id, abortController.signal)
            .then(() => history.push('/dashboard'))
            .catch(setError)
    
        return () => abortController.abort()
    };

//     have the following required and not-nullable fields:
//      - Table number: `<select name="table_id" />`. The text of each option must be `{table.table_name} - {table.capacity}` so the tests can find the options.
//    - do not seat a reservation with more people than the capacity of the table
//    - display a `Submit` button that, when clicked, assigns the table to the reservation then displays the `/dashboard` page
//    - PUT to `/tables/:table_id/seat/` in order to save the table assignment. The body of the request must be `{ data: { reservation_id: x } }` where X is the reservation_id of the reservation being seated. The tests do not check the body returned by this request.
//    - display a `Cancel` button that, when clicked, returns the user to the previous page
    return (
        <div>
        <h1>Choose a table</h1>
        <ErrorAlert error={error}/>
        <form className="center" onSubmit={handleSubmit}>
            <h2 style = {{fontSize: 30}}>Table Name - Table Capacity</h2>
            {tables && (
            <div>
                <select
                name="table_id"
                required
                onChange={changeHandler}>
                <option value="">Select..</option>
                {tables.map((table) => (
                    <option value={table.table_id} key={table.table_id}>
                    {table.table_name} - {table.capacity}
                    </option>
                ))}
                </select>
            </div>
            )}
            <button className="button" onClick={history.goBack}>
            CANCEL
            </button>
            <button type="submit" className="button">
            SUBMIT
            </button>
        </form>
        </div>
    );
}

export default ReservationSeat;