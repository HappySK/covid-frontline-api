var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ResourceSchema = new Schema(
  {
    addedby: {
      type: String,
      required: true,
    },
    name: {
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
var Resource = mongoose.model("Resource", ResourceSchema);

// make this available to our Node applications
module.exports = Resource;
