const timesheetModel = require("../../model/timesheet");
const userModel = require("../../model/user");
const tagModel = require("../../model/tag");
const { StatusCodes } = require("http-status-codes");
const { APIError } = require("../../middleware/errorHandler");
const { getAllTS } = require("../../helper/ts");

//create post
const createTimesheet = async (req, res) => {
  const { date, start_time, end_time, tagID, userID } = req.body;

  if (!userID) throw new APIError("userID required", StatusCodes.NOT_FOUND)
  const user = await userModel.findById({ _id: userID })
  if (!user) throw new APIError("user not found", StatusCodes.NOT_FOUND)

  if (!tagID) throw new APIError("tagID required", StatusCodes.NOT_FOUND)
  const tag = await tagModel.findById({ _id: tagID })
  if (!tag) throw new APIError("tag not found", StatusCodes.NOT_FOUND)

  if (!date) throw new APIError("date not found", StatusCodes.NOT_FOUND)
  if (!start_time) throw new APIError("start_time not found", StatusCodes.NOT_FOUND)
  if (!end_time) throw new APIError("end_time not found", StatusCodes.NOT_FOUND)

  const newTimeSheet = await timesheetModel.create({
    date: date,
    start_time: start_time,
    end_time: end_time,
    tagID: tagID,
    userID: userID,
  }).catch(err => {
    if (err.code === 11000)
      throw new APIError(`Duplication error:  ${JSON.stringify(err.keyValue)}`, err.code)
    throw new APIError(err.message, err.code)
  })

  return res.status(StatusCodes.OK).json({
    status: StatusCodes.CREATED,
    data: newTimeSheet,
  });

};

//Get tags
const getTimesheet = async (req, res) => {

  const { tsID : _id, userID } = req.query;

  const query_params = {}
  if (_id) query_params["_id"] = _id
  if (userID) query_params["userID"] = userID;

  const { ts, allDates, allTags } = await getAllTS({query_params})

  if (ts.length === 0)
    return res.status(StatusCodes.OK).json({
      status: StatusCodes.NOT_FOUND,
      data: "No timesheet found",
    });

  res.status(StatusCodes.OK).json({
    status: StatusCodes.OK,
    data: {
      count: ts.length,
      timesheet: ts,
      // tag: allTags,
      // date: allDates
    }
  });

};

//Update tag
const updateTimesheet = async (req, res) => {
  const { date, start_time, end_time, tagID, } = req.body;
  const { timesheetID } = req.params;

  if (!timesheetID) throw new APIError("timesheetID required", StatusCodes.NOT_FOUND)
  const timesheet = await timesheetModel.findById({ _id: timesheetID })
  if (!timesheet) throw new APIError("timesheet not found", StatusCodes.NOT_FOUND)

  if (!tagID) throw new APIError("tagID required", StatusCodes.NOT_FOUND)
  const tag = await tagModel.findById({ _id: tagID })
  if (!tag) throw new APIError("tag not found", StatusCodes.NOT_FOUND)

  await timesheetModel.findByIdAndUpdate(
    { _id: timesheetID },
    {
      date: date,
      start_time: start_time,
      end_time: end_time,
      tagID: tagID,
    }).catch(err => {
      if (err.code === 11000)
        throw new APIError(`Duplication error:  ${JSON.stringify(err.keyValue)}`, err.code)
      throw new APIError(err.message, err.code)
    })

  return res.status(StatusCodes.OK).json({
    status: StatusCodes.OK,
    data: "timesheet updated successfully.",
  });
};

// delete tag
const deleteTimesheet = async (req, res) => {
  const { timesheetID } = req.params;

  if (!timesheetID) throw new APIError("timesheetID required", StatusCodes.NOT_FOUND)
  const timesheet = await timesheetModel.findById({ _id: timesheetID })
  if (!timesheet) throw new APIError("timesheet not found", StatusCodes.NOT_FOUND)

  await timesheetModel.deleteOne({ _id: timesheetID })

  return res.status(StatusCodes.OK).json({
    status: StatusCodes.OK,
    data: "timesheet deleted successfully.",
  });
};

module.exports = {
  createTimesheet,
  getTimesheet,
  updateTimesheet,
  deleteTimesheet,
};
