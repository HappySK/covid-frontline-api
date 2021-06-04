const express = require("express");

const equipmentprovidermodel = require("../models/equipmentproviders.js");

const route = express.Router();

route.post("/add", async (req, res) => {
	const equipementprovider = await new equipmentprovidermodel(req.body);
	equipementprovider.save((err, equipementprovider) => {
		if (err) return res.json({ success: false, message: err.message });
		else return res.json({ success: true, message: equipementprovider });
	});
});

route.get("/get", async (req, res) => {
	equipmentprovidermodel.find((err, equipementproviders) => {
		if (err) return res.json({ success: false, message: err.message });
		else return res.json({ success: true, message: equipementproviders });
	});
});

route.get("/get/:id", async (req, res) => {
	equipmentprovidermodel.findById(req.params.id, (err, equipementprovider) => {
		if (err) return res.json({ success: false, message: err.message });
		else return res.json({ success: true, message: equipementprovider });
	});
});

route.patch("/update/:id", async (req, res) => {
	equipmentprovidermodel.findByIdAndUpdate(
		req.params.id,
		req.body,
		(err, equipementprovider) => {
			if (err) return res.json({ success: false, message: err.message });
			else return res.json({ success: true, message: equipementprovider });
		}
	);
});

route.delete("/delete/:id", async (req, res) => {
	equipmentprovidermodel.findByIdAndDelete(req.params.id, (err) => {
		if (err) return res.json({ success: false, message: err.message });
		else
			return res.json({
				success: true,
				message: "Equipment Deleted Successfully",
			});
	});
});

module.exports = route;
