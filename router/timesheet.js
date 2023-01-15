const router = require("express").Router();
const { createTimesheet, getTimesheet, updateTimesheet, deleteTimesheet } = require("../controller/timesheet/timesheet");

router
  .route("/")
  .get(getTimesheet)
  .post(createTimesheet)
  
  router
  .route("/:timesheetID")
  .patch(updateTimesheet)
  .delete(deleteTimesheet)


module.exports = router;
