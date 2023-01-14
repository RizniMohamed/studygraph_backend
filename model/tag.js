const mongoose = require("mongoose");

const tagSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    trim: true,
  },
  color : {
    type: String,
    required: [true, "Please provide color"],
    default : 10
  },
  userID: {
    type: String,
    required: [true, "Please provide UserID"],
    trim: true,
  },
},
  {
    timestamps: true,
  }
);

const tagModel = mongoose.model("tag", tagSchema);

module.exports = tagModel;
