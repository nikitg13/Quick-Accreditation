const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const safetyMeasureSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  safetyMeasure: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("SafetyMeasure", safetyMeasureSchema);
