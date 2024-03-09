import React from "react";

function TableList({ tables }) {
    return (
        <div className="listTable">
            {tables.map((table) => (
                <div className="row">
                    <div className="item">
                        <div className="col">
                            <h3>Table {table.table_name}</h3>
                            <div>
                                <h3 className="item">{table.capacity} seats</h3>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default TableList;