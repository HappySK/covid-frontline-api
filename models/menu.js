const mongoose = require("mongoose");

const MenuSchema = new mongoose.Schema({
  menu: {
    type: String,
    required: true,
  },
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
