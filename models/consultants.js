const mongoose = require("mongoose");

const consultantschema = mongoose.Schema(
	{
		resource: String,
		addedBy: String,
	},
	{ timestamps: true }
);

const consultantmodel = mongoose.model("consultants", consultantschema);

module.exports = consultantmodel;
