const mongoose = require("mongoose");

const PageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  menu: {
    type: String,
    
  },
  submenu: {
    type: String,
  
  },
  selectoption: {
    type: String,
   
  },

   addedby: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },
});

const Page = mongoose.model("Page", PageSchema);

module.exports = Page;
