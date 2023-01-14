const router = require("express").Router();
const { getLineChart } = require("../controller/dashbaord/dashbaord");

router
    .route("/linechart")
    .post(getLineChart)

module.exports = router;
