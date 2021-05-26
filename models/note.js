var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var NoteSchema = new Schema(
  {
    addedby: {
      type: String,
      required: true,
    },
  addedname: {
      type: String,
      required: true,
    },
    patientid: {
      type: String,
      required: true,
    },
    note: {
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
var Note = mongoose.model("Note", NoteSchema);

// make this available to our Node applications
module.exports = Note;
