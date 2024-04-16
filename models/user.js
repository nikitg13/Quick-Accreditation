const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passwordlocalmongoose = require("passport-local-mongoose");

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  lab: [
    {
      type: Schema.Types.ObjectId,
      ref: "laboratoryInfo",
    },
  ],
  safetyMeasures: [
    {
      type: Schema.Types.ObjectId,
      ref: "SafetyMeasure",
    },
  ],
  bookedVisit: {
    type: Number,
    default: 0,
  },
});

UserSchema.plugin(passwordlocalmongoose);

module.exports = mongoose.model("User", UserSchema);
