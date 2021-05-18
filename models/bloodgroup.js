var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var BloodGroupSchema = new Schema(
  {
    bloodgroup: {
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
var BloodGroup = mongoose.model("BloodGroup", BloodGroupSchema);

// make this available to our Node applications
module.exports = BloodGroup;
