const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res) {
  const { date } = req.query;
  const data = await service.list(date);
  res.json({ data });
}


module.exports = {
  list: asyncErrorBoundary(list),
};
