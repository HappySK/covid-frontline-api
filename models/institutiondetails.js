const mongoose = require("mongoose");

const institution = mongoose.Schema(
	{
		institutionName: String,
		addressLine1: String,
		addressLine2: String,
		city: String,
		state: String,
		pincode: String,
		addedBy: String,
	},
	{ timestamps: true }
);

const institutionModel = mongoose.model("institutions", institution);

module.exports = institutionModel;
