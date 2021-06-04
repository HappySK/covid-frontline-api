const express = require("express");

const ambulancemodel = require("../models/ambulance.js");

const route = express.Router();

route.post("/add", async (req, res) => {
	const { resource, addedBy } = req.body;
	const ambulance = await new ambulancemodel({ resource, addedBy });
	await ambulance.save((err) => {
		if (err) return res.json({ success: false, message: err.message });
		else
			return res.json({
				success: true,
				message: "ambulance Added Successfully",
			});
	});
});

route.get("/get", (req, res) => {
	ambulancemodel.find((err, ambulances) => {
		if (err) return res.json({ success: false, message: err.message });
		else return res.json({ success: true, message: ambulances });
	});
});

route.get("/get/:id", (req, res) => {
	ambulancemodel.findById(req.params.id, (err, ambulances) => {
		if (err) return res.json({ success: false, message: err.message });
		else return res.json({ success: true, message: ambulances });
	});
});

route.patch("/update/:id", (req, res) => {
	ambulancemodel.findByIdAndUpdate(req.params.id, { ...req.body }, (err) => {
		if (err) return res.json({ success: false, message: err.message });
		else
			return res.json({
				success: true,
				message: "ambulance Updated Successfully",
			});
	});
});

route.delete("/delete/:id", (req, res) => {
	ambulancemodel.findByIdAndDelete(req.params.id, (err) => {
		if (err) return res.json({ success: false, message: err.message });
		else
			return res.json({
				success: true,
				message: "ambulance Deleted Successfully",
			});
	});
});

module.exports = route;
