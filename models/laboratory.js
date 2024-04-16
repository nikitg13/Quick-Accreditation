const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const laboratorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  numberOfStudent: {
    type: Number,
    required: true,
  },
  nameofEquipments: {
    type: String,
    required: true,
  },
  nameOfStaff: {
    type: String,
    required: true,
  },
  Designation: {
    type: String,
    required: true,
  },
  Qualification: {
    type: String,
    required: true,
  },
  weeklyStatus: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("laboratoryInfo", laboratorySchema);
