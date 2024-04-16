const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const facultySchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  regularCAY: {
    type: Number,
    required: true,
  },
  contractualCAY: {
    type: Number,
    required: true,
  },
  phdCAY: {
    type: Number,
    required: true,
  },
  mtechCAY: {
    type: Number,
    required: true,
  },
  F20CAY: {
    type: Number,
    required: true,
  },
  FQCAY: {
    type: Number,
    required: true,
  },
  regularCAYm1: {
    type: Number,
    required: true,
  },
  contractualCAYm1: {
    type: Number,
    required: true,
  },
  phdCAYm1: {
    type: Number,
    required: true,
  },
  mtechCAYm1: {
    type: Number,
    required: true,
  },
  F20CAYm1: {
    type: Number,
    required: true,
  },
  FQCAYm1: {
    type: Number,
    required: true,
  },
  regularCAYm2: {
    type: Number,
    required: true,
  },
  contractualCAYm2: {
    type: Number,
    required: true,
  },
  phdCAYm2: {
    type: Number,
    required: true,
  },
  mtechCAYm2: {
    type: Number,
    required: true,
  },
  F20CAYm2: {
    type: Number,
    required: true,
  },
  FQCAYm2: {
    type: Number,
    required: true,
  },
  facultyRetained: {
    type: Number,
    required: true,
  },
  percentRetained: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("facultyInfo", facultySchema);
