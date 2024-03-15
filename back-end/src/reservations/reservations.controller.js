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

function validateDate(req, res, next) {
  const date = req.body.data.reservation_date;
  const valid = Date.parse(date);
  if (valid) {
    return next();
  }
  next({
    status: 400,
    message: "reservation_date must be valid date.",
  });
}

function hasReservationTime(req, res, next) {
  const regex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/;
  let time = req.body.data.reservation_time;
  const valid = time.match(regex);

  if (valid) {
    return next();
  }
  next({
    status: 400,
    message: "reservation_time must be valid time.",
  });
}

function peopleIsANumber(req, res, next) {
  const people = req.body.data.people;
  if (people > 0 && typeof people === "number") {
    return next();
  }
  next({
    status: 400,
    message: "Valid people property required.",
  });
}

// middleware that is intended to check whether a reservation is being made for a future time
function noPastReservations(req, res, next) {
  const { reservation_date, reservation_time } = req.body.data;
  const now = Date.now();
  const proposedReservation = new Date(`${reservation_date} ${reservation_time}`).valueOf();

  if (proposedReservation > now) {
    return next(); // Call next middleware
  }
    // If reservation is for a past time, send an error response
    next({
      status: 400,
      message: "Reservation must be in future."
    });
}

function notTuesday(req, res, next) {
  const date = req.body.data.reservation_date;
  const weekday = new Date(date).getUTCDay();
  if (weekday === 2) {
    // If reservation date is Tuesday, send an error response
    next({
      status: 400,
      message: "Restaurant is closed on Tuesdays."
    });
  }
  return next(); 
}

function reservationDuringHours(req, res, next) {
  const time = req.body.data.reservation_time;
  const hours = parseInt(time.split(':')[0]); 
  const minutes = parseInt(time.split(':')[1]);
  
  const reservationTime = new Date(); // Get current date and time
  reservationTime.setHours(hours); // Set the hours portion of the date
  reservationTime.setMinutes(minutes); // set the minutes portion of the date
  
  // Check if reservation time is after 10:30AM
  if (reservationTime.getHours() < 10 || (reservationTime.getHours() === 10 && reservationTime.getMinutes() < 30)) {
    return next({
      status: 400,
      message: "Restaurant must be after 10:30AM",
    });
  }
  
  // Check if reservation time is before 9:30PM
  if (reservationTime.getHours() > 21 || (reservationTime.getHours() === 21 && reservationTime.getMinutes() >= 30)) {
    return next({
      status: 400,
      message: "Restaurant must be before 9:30PM",
    });
  }
  
  // If both conditions are satisfied, proceed to the next middleware
  return next();
}


// function hasValidStatus(req, res, next) {
//   const { status } = req.body.data;
//   const resStatus = res.locals.reservation.status;

//   if (status === "booked" || status === "seated" || status === "finished" || status === "cancelled") {
//     res.locals.status = status;
//     return next();
//   }
//   next({
//     status: 400,
//     message: `Invalid status`,
//   });
// }

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

async function updateReservationStatus(req, res, next) {
  const { reservation_id } = req.params;
  const { status } = req.body;

  try {
    const updatedReservation = await updateStat(reservation_id, status);
    res.json({ data: updatedReservation });
  } catch (error) {
    next(error);
  }
}


module.exports = {
  list: asyncErrorBoundary(list),
  read: [reservationExists, asyncErrorBoundary(read)],
  create: [hasOnlyValidProperties, hasRequiredProperties, validateDate, hasReservationTime, peopleIsANumber, noPastReservations, notTuesday, reservationDuringHours, asyncErrorBoundary(create)],
  update: [reservationExists, hasOnlyValidProperties, hasRequiredProperties, asyncErrorBoundary(update), asyncErrorBoundary(updateReservationStatus)],
};
