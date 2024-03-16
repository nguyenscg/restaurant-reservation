const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require ("../errors/hasProperties");
const hasRequiredProperties = hasProperties("table_name", "capacity");

function validateTableName(req, res, next) {
    const table_name = req.body.data.table_name;
  
    // Check if table_name is one character or less
    if (table_name.length < 2) {
      return next({
        status: 400,
        message: "table_name must be more than one character"
      });
    }
  
    // If validation passes, call next middleware
    next();
  }
  

  function capacityIsANumber(req, res, next) {
    const capacity = req.body.data.capacity;
    if (capacity > 0 && typeof capacity === "number") { // Changed 'people' to 'capacity'
      return next();
    }
    next({
      status: 400,
      message: "Valid capacity property required.",
    });
  }
  
  function hasSufficientCapacity(req, res, next) {
    const capacity = res.locals.table.capacity;
    const numberOfGuests = req.body.data.people;
  
    if (typeof numberOfGuests !== 'number' || numberOfGuests <= 0) {
      return next({
        status: 400,
        message: "numberOfGuests must be a positive number."
      });
    }
  
    if (capacity >= numberOfGuests) {
      return next();
    } else {
      return next({
        status: 400,
        message: "Insufficient table capacity."
      });
    }
  }

  function validateReservationId(req, res, next) {
    const { reservation_id } = req.body;
  
    // Check if reservation_id is missing
    if (!reservation_id) {
      return next({
        status: 400,
        message: "numberOfGuests must be a positive number."
      });
    }
  
    // If reservation_id is provided, call next middleware
    next();
  }

  function tableOccupied(req, res, next) {
    if (res.locals.table.occupied) {
      return next({
        status: 400,
        message: "Table is occupied."
      });
    }
  }

// list all tables
async function list(req, res) {
    const data = await service.list();
    res.json({ data });
}

// read table_id
async function tableExists(req, res, next) {
    const table = await service.read(req.params.table_id);

    if (table) {
        res.locals.table = table;
        return next();
    }
    next({ status: 404, message: "Table cannot be found cannot be found." });
}

// create a table
async function create(req, res) {
    const data = await service.create(req.body.data);
    res.status(201).json({ data });
}

async function update(req, res, next) {
    try {
        const { reservation_id } = req.body.data;
        const updatedRecord = await service.update(reservation_id, res.locals.table.table_id);
        res.status(200).json({ data: updatedRecord });
    } catch (error) {
        next(error);
    }
}

// async function seatTable(req, res, next) {
//     const status = res.locals.reservation.status;

//     if (status === "seated") {
//         return next({
//             status: 400,
//             message: `Table is already seated`,
//         });
//     }
//     next();
// }


module.exports = {
    list: asyncErrorBoundary(list),
    create: [hasRequiredProperties, validateTableName, capacityIsANumber, asyncErrorBoundary(create)],
    update: [asyncErrorBoundary(tableExists), hasSufficientCapacity, validateReservationId, tableOccupied, asyncErrorBoundary(update)],
}