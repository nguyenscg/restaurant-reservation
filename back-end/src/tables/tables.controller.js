const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require ("../errors/hasProperties");
const hasRequiredProperties = hasProperties("table_name", "capacity");

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

async function hasValidName(req, res, next) {
    const table_name = req.body.data.table_name;
    if (table_name.length < 1 ) {
        return next({
            status: 400,
            message: `Invalid table_name`
        })
    }
    next();
}

module.exports = {
    list: asyncErrorBoundary(list),
    create: [hasRequiredProperties, hasValidName, asyncErrorBoundary(create)],
}