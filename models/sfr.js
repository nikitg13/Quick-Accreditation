const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sfrSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  UGPrograms: {
    type: Number,
    required: true,
  },
  PGPrograms: {
    type: Number,
    required: true,
  },
  u1: {
    type: Number,
    required: true,
  },
  u2: {
    type: Number,
    required: true,
  },
  u3: {
    type: Number,
    required: true,
  },
  p1: {
    type: Number,
    required: true,
  },
  p2: {
    type: Number,
    required: true,
  },
  totalStudentsCAY: {
    type: Number,
    required: true,
  },
  totalStudentsCAYm1: {
    type: Number,
    required: true,
  },
  totalStudentsCAYm2: {
    type: Number,
    required: true,
  },
  totalFacultyCAY: {
    type: Number,
    required: true,
  },
  totalFacultyCAYm1: {
    type: Number,
    required: true,
  },
  totalFacultyCAYm2: {
    type: Number,
    required: true,
  },
  SFRCAY: {
    type: Number,
    required: true,
  },
  SFRCAYm1: {
    type: Number,
    required: true,
  },
  SFRCAYm2: {
    type: Number,
    required: true,
  },
  AvgSFR: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Sfr", sfrSchema);
