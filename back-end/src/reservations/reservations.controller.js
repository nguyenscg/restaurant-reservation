const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");
const hasRequiredProperties = hasProperties("first_name", "last_name", "mobile_number", "reservation_date", "reservation_time", "people");

const VALID_PROPERTIES = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
  "status",
];

function hasOnlyValidProperties(req, res, next) {
  const { data = {} } = req.body;

  const invalidFields = Object.keys(data).filter(
    (field) => !VALID_PROPERTIES.includes(field)
  );

  if (invalidFields.length) {
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(", ")}`,
    });
  }
  next();
}

function hasValidStatus(req, res, next) {
  const { status } = req.body.data;
  const resStatus = res.locals.reservation.status;

  if (status === "booked" || status === "seated" || status === "finished" || status === "cancelled") {
    res.locals.status = status;
    return next();
  }
  next({
    status: 400,
    message: `Invalid status`,
  });
}

function hasValidTime(req, res, next) {
  const { reservation_time } = req.body.data;

  if (!reservation_time) {
    return res.sendStatus(400)
  }
  next({
    status: 400,
    message: `Invalid time`,
  });
}

async function list(req, res, next) {
  try {
    const { date, mobile_number } = req.query;
    let data;

    if (date) {
      data = await service.listByDate(date);
    } else if (mobile_number) {
      data = await service.search(mobile_number);
    } else {
      data = await service.list();
    }

    res.json({ data });
  } catch (error) {
    next(error); // This will pass the error to Express's default error handler
  }
}

async function read(req, res) {
  const data = res.locals.reservation;
  res.json({ data });
}

async function reservationExists(req, res, next) {
  const { reservation_id } = req.params;
  const reservation = await service.read(reservation_id);
  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  next({ status: 404, message: `Reservation id not found: ${reservation_id}` });
}

async function isValidDate(req, res, next) {
  const { reservation_date } = req.body;

  // Validate the reservation_date using appropriate validation logic
  // For example, you can use a library like Moment.js to validate the date
  if (!reservation_date) {
    // If the date is not valid, return a 400 status code
    return res.status(400).json({ error: "reservation_date is not a valid date" });
  }
  next();
}

async function create(req, res) {
  const data = await service.create(req.body.data);
  res.status(201).json({ data });
}

async function update(req, res) {
  const updatedReservation = {
    ...req.body.data,
    reservation_id: res.locals.reservation.reservation_id,
  };
  const data = await service.update(updatedReservation);
  res.status(200).json({ data });
}


module.exports = {
  list: asyncErrorBoundary(list),
  read: [reservationExists, asyncErrorBoundary(read)],
  create: [hasOnlyValidProperties, hasRequiredProperties, isValidDate, asyncErrorBoundary(create)],
  update: [reservationExists, hasOnlyValidProperties, hasRequiredProperties, hasValidStatus, asyncErrorBoundary(update)],
};
