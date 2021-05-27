const mongoose = require("mongoose");

const MenuSchema = new mongoose.Schema({
  menu: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
//  addedbyid: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "SuperAdmin",
//   },
  addedby:{
    type: String,
    required: true,
  }
},
  {
    timestamps: true,
  }
);

const Menu = mongoose.model("Menu", MenuSchema);

module.exports = Menu;
