const mongoose = require("mongoose");

const vaccineschema = mongoose.Schema(
	{
		resource: String,
		addedBy: String,
	},
	{ timestamps: true }
);

module.exports = mongoose.model("vaccine", vaccineschema);
