import React, { useState, useEffect } from "react";
import { listTables } from "../utils/api";


function TableList({ tables }) {
    const [tables, setTables] = useState([]);
    
    useEffect(() => {
        const fetchList = async () => {
            const abortController = new AbortController();
            try {
                const response = await listTables(abortController.signal);
                setTables(response);
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