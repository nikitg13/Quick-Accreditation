const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InstitutionalSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  university: {
    type: String,
    required: true,
  },
  estYear: {
    type: Number,
    required: true,
  },
  institutionalType: {
    type: String,
    required: true,
  },
  ownershipStatus: {
    type: String,
    required: true,
  },
  vision: {
    type: String,
    required: true,
  },
  mission: {
    type: String,
    required: true,
  },
  headName: {
    type: String,
    required: true,
  },
  headContact: {
    type: Number,
    required: true,
  },
  headEmail: {
    type: String,
    required: true,
  },
  nbaCoordinatorName: {
    type: String,
    required: true,
  },
  nbaCoordinatorEmail: {
    type: String,
    required: true,
  },
  nbaCoordinatorContact: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("InstitutionalInfo", InstitutionalSchema);
