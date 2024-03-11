const knex = require("../db/connection");

function listByDate(date) {
    return knex("reservations")
        .select("*")
        .where({ reservation_date: date })
        .whereNot({ status: "finished" })
        .orderBy("reservation_time");
}

function list() {
    return knex("reservations")
        .select("*")
        .orderBy("reservation_time");
}


function read(reservation_id) {
    return knex("reservations")
        .select("*")
        .where({ reservation_id })
        .first();
}

function create(reservation) {
    return knex("reservations")
        .insert(reservation)
        .returning("*")
        .then((createdRecords) => createdRecords[0]);
}

function update(updatedReservation) {
    return knex("reservations")
        .select("*")
        .where({ reservation_id: updatedReservation.reservation_id })
        .update(updatedReservation, "*");
}

function search(mobile_number) {
    return knex("reservations")
        .whereRaw("translate(mobile_number, '() -', '') like ?",
        `%${mobile_number.replace(/\D/g, "")}%`
        )
        .orderBy("reservation_date");
}

// set the status of the reservation to cancelled using a PUT to /reservations/:reservation_id/status with a body of {data: { status: "cancelled" } }.
// need an updateStatus function

function updateStat(reservation_id, status) {
    return knex("reservations")
        .where({ reservation_id })
        .update({status: status }, "*")
}

module.exports = {
    list,
    listByDate,
    read,
    create,
    update,
    search,
    updateStat,
}