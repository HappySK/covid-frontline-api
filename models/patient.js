var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PatientSchema = new Schema(
  {
    addedby: {
      type: String,
      required: true,
    },
    requestid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Request",
    },

    patient_at: {
      type: String,
      required: true,
    },

    current_spo2: {
      type: String,
      required: true,
    },
    patient_location: {
      type: String,
      required: true,
    },
    comorbidity_conditions: {
      type: String,
      required: true,
    },
    Priority: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
// the schema is useless so far
// we need to create a model using it
var Patient = mongoose.model("Patient", PatientSchema);

// make this available to our Node applications
module.exports = Patient;
