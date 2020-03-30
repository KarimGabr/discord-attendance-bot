const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const attendancesSchema = new Schema(
  {
    userID: String,
    userName: String,
    memberName: String,
    punchType: String
  },
  {
    timestamps: true
  }
);

const Attendances = mongoose.model("Attendances", attendancesSchema);

module.exports = Attendances;
