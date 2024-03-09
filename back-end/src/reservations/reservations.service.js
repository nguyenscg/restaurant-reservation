const knex = require("../db/connection");

function read(reservation_id) {
    return knex("reservations").select("*").where({ reservation_id }).first();
}

module.exports = {
    read,
}