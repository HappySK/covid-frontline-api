var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CountrySchema = new Schema(
  {
    country: {
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
var Country = mongoose.model("Country", CountrySchema);

// make this available to our Node applications
module.exports = Country;
