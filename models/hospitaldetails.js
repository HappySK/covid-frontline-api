const mongoose = require("mongoose");

const hospital = mongoose.Schema(
	{
		resource: String,
		addedBy: String,
	},
	{ timestamps: true }
);

const hospitalModel = mongoose.model("hospital", hospital);

module.exports = hospitalModel;
