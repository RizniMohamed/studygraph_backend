const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please provide email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
    },
  },
  {
    timestamps: false,
  }
);

const userModel = mongoose.model("user", userSchema);

(async () => {
  const data = await userModel.find({}).exec();
  if (data.length !== 0) return;

  const admin1 = new userModel({
    username: "Aarah",
    password: "rc",
  });
  await admin1.save();

  const admin2 = new userModel({
    username: "Sarah",
    password: "rc",
  });
  await admin2.save();
})();

module.exports = userModel;
