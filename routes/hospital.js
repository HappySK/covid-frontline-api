const express = require("express");

const hospitalmodel = require("../models/hospitaldetails");

const route = express.Router();

route.post("/add", async (req, res) => {
	const hospital = await new hospitalmodel(req.body);
	await hospital.save((err, hospital) => {
		if (err) return res.json({ success: false, message: err.message });
		else return res.json({ success: true, message: hospital });
	});
});

route.get("/get", async (req, res) => {
	await hospitalmodel.find((err, hospitalResources) => {
		if (err) return res.json({ success: false, message: err.message });
		else return res.json({ success: true, message: hospitalResources });
	});
});

route.get("/get/:id", async (req, res) => {
	await hospitalmodel.findById(req.params.id, (err, hospitalResources) => {
		if (err) return res.json({ success: false, message: err.message });
		else return res.json({ success: true, message: hospitalResources });
	});
});

route.patch("/update/:id", async (req, res) => {
	await hospitalmodel.findByIdAndUpdate(
		req.params.id,
		{ ...req.body },
		(err, updatedResources) => {
			if (err) return res.json({ success: false, message: err.message });
			else return res.json({ success: true, message: updatedResources });
		}
	);
});

route.delete("/delete/:id", async (req, res) => {
	await hospitalmodel.findByIdAndDelete(req.params.id, (err) => {
		if (err) return res.json({ success: false, message: err.message });
		else
			return res.json({
				success: true,
				message: "Hospital Resource deleted successfully",
			});
	});
});

module.exports = route;
