import React from "react";

function TableCreate() {
    const initialFormData = {
        table_name: "",
        capacity: 0,
    };

    const [formData, setFormData] = useState({...initialFormData});

    const handleChange = (event) => {
        event.preventDefault();
        const message = `Is this table ready to seat new guests? This cannot be undone.`;
        if (window.confirm(message)) {
            const abortController = new AbortController();
            setSeatError(null);
            unassignTable(table_id, abortController.signal)
            .then(() => {
                loadReservations();
            })
            .catch(setSeatError);
            return () => abortController.abort();
        }
    };
    
    return (
    <div>
        <h2>Create Table:</h2>
        <form obSubmit={handleSubmit}>
            <label htmlFor="table_name">Table Name:</label>
            <input
                id="table_name"
                name="table_name"
                type="text"
                required
                value={table.table_name}
                onChange={handleChange}
                />
            <label htmlFor="capacity">Capacity:</label>
            <input
                    id="capacity"
                    name="capacity"
                    type="number"
                    required
                    value={table.capcity}
                    onChange={handleChange}
            />
        </form>
    </div>
    );
    
}

export default TableCreate;