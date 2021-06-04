const mongoose = require("mongoose");

const ambulanceschema = mongoose.Schema(
	{
		resource: String,
		addedBy: String,
	},
	{ timestamps: true }
);

const ambulancemodel = mongoose.model("ambulances", ambulanceschema);

module.exports = ambulancemodel;
