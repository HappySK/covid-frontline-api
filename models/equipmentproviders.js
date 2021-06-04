const mongoose = require("mongoose");

const equipmentproviderschema = mongoose.Schema(
	{
		resource: String,
		addedBy: String,
	},
	{ timestamps: true }
);

const equipmentprovidermodel = mongoose.model(
	"Equipment Provider",
	equipmentproviderschema
);

module.exports = equipmentprovidermodel;
