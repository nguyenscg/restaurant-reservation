const knex = require ("../db/connection");

function list() {
    return knex("tables")
        .select("*")
        .orderBy("table_name");
}

function read(table_id) {
    return knex("tables")
        .select("*")
        .where({ table_id })
        .first();
}

function create(table) {
    return knex("tables")
        .insert(table)
        .returning("*")
        .then((createdTable) => createdTable[0]);
}

// make sure the tables and reservations records are always in sync with each
function update(reservation_id, table_id) {
    return knex.transaction(function (trx) {
        return knex("reservations")
            .where({ reservation_id })
            .update({ status: "seated" })
            .transacting(trx)
            .then(() => {
                return knex("tables")
                    .where({ table_id })
                    .update({
                        reservation_id,
                    })
                    .transacting(trx);
            })
            .then(trx.commit)
            .catch(trx.rollback);
    });
}

function destroy(reservation_id, table_id) {
    return knex.transaction(function (trx) {
        return knex("reservations")
            .where({ reservation_id })
            .update({ status: "finished" })
            .transacting(trx)
            .then(() => {
                return knex("tables")
                    .where({ table_id })
                    .update({
                        reservation_id,
                    })
                    .transacting(trx);
            })
            .then(trx.commit)
            .catch(trx.rollback);
    });
}

module.exports = {
    list,
    read,
    create,
    update,
    destroy,
}