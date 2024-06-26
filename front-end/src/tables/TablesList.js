import { useHistory } from "react-router-dom";
import { unassignTable } from "../utils/api";

function TableList({ tables }) {
  const history = useHistory();

  const finishHandler = (e) => {
    e.preventDefault();
    const controller = new AbortController();
    const message = `Is this table ready to seat new guests? This cannot be undone.`;
    if (window.confirm(message)) {
      unassignTable(e.target.value, controller.signal)
      .then(() => history.push("/"))
    }
    return () => controller.abort();
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Table Name</th>
          <th scope="col">Capacity</th>
          <th scope="col">Status</th>
          <th scope="col">Click when table is open</th>
        </tr>
      </thead>
      <tbody>{tables.map((table) => {
           return (
      <tr key={table.table_id}>
        <td>{table.table_name}</td>
        <td>{table.capacity}</td>
        <td data-table-id-status={table.table_id}>{table.reservation_id ? "occupied" : "free" }</td>
        <td>
          {table.reservation_id ? (
            <button
              data-table-id-finish={table.table_id}
              type="button"
              className="btn-dark"
              onClick={finishHandler}
              value={table.table_id}
            >
              Finish
            </button>
          ) : null}
        </td>
      </tr>
    );
  })}</tbody>
    </table>
  );
}

export default TableList;