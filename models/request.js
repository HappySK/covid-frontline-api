var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var RequestSchema = new Schema(
  {
    addedby: {
      type: String,
      required: true,
    },
    patient_name: {
      type: String,
      required: true,
    },
    patient_mobilenumber: {
      type: Number,
      required: true,
    },
    patient_requirement: {
      type: String,
      required: true,
    },
    patient_stage: {
      type: String,
      required: true,
    },
    guardian_name: {
      type: String,
      required: true,
    },
    guardian_mobilenumber: {
      type: Number,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);
// the schema is useless so far
// we need to create a model using it
var Request = mongoose.model("Request", RequestSchema);

// make this available to our Node applications
module.exports = Request;
