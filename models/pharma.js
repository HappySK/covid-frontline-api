const mongoose = require("mongoose");

const pharmaschema = mongoose.Schema(
	{
		resource: String,
		addedBy: String,
	},
	{ timestamps: true }
);

module.exports = mongoose.model("pharma", pharmaschema);
