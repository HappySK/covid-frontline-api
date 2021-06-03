const mongoose = require("mongoose");

const socialmedia = mongoose.Schema(
	{
		facebook: String,
		twitter: String,
		linkedin: String,
		instagram: String,
		youtube: String,
		addedBy: String,
	},
	{ timestamps: true }
);

const socialmediamodel = mongoose.model("socialmedia", socialmedia);

module.exports = socialmediamodel;
