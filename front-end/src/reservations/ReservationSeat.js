import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { listTables } from "../utils/api";

function ReservationSeat() {
    const { reservation_id } = useParams();
    const history = useHistory();

//     have the following required and not-nullable fields:
//      - Table number: `<select name="table_id" />`. The text of each option must be `{table.table_name} - {table.capacity}` so the tests can find the options.
//    - do not seat a reservation with more people than the capacity of the table
//    - display a `Submit` button that, when clicked, assigns the table to the reservation then displays the `/dashboard` page
//    - PUT to `/tables/:table_id/seat/` in order to save the table assignment. The body of the request must be `{ data: { reservation_id: x } }` where X is the reservation_id of the reservation being seated. The tests do not check the body returned by this request.
//    - display a `Cancel` button that, when clicked, returns the user to the previous page
}

export default ReservationSeat;