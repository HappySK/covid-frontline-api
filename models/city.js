var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CitySchema = new Schema(
  {
    city: {
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
var City = mongoose.model("City", CitySchema);

// make this available to our Node applications
module.exports = City;
