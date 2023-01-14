const mongoose = require("mongoose");

const timesheetSchema = mongoose.Schema({
  date: {
    type: Date,
    required: [true, "Please provide date"],
    trim: true,
  },
  start_time : {
    type: String,
    required: [true, "Please provide start time"],
    default : 10
  },
  end_time: {
    type: String,
    required: [true, "Please provide end time"],
    trim: true,
  },
  tagID: {
    type: String,
    required: [true, "Please provide tagID"],
    trim: true,
  },
  userID: {
    type: String,
    required: [true, "Please provide userID"],
    trim: true,
  },
},
  {
    timestamps: false,
  }
);

const timesheetModel = mongoose.model("timesheet", timesheetSchema);

module.exports = timesheetModel;
