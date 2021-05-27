const mongoose = require("mongoose");

const SubMenuSchema = new mongoose.Schema({
  menu: {
    type: String,
    required: true,
  },
   submenu: {
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

const SubMenu = mongoose.model("SubMenu", SubMenuSchema);

module.exports = SubMenu;
