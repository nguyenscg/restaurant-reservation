const reservations = require("./00-reservations.json"); // import the reservations data to use into reservations table

exports.seed = function (knex) {
  return knex
  .raw("TRUNCATE TABLE reservations RESTART IDENTITY CASCADE")
  .then(() => knex("reservations").insert(reservations));
};
