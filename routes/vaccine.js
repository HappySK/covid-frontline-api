const express = require("express");

const vaccinemodel = require("../models/vaccine.js");

const route = express.Router();

route.post("/add", async (req, res) => {
	const { resource, addedBy } = req.body;
	const vaccine = await new vaccinemodel({ resource, addedBy });
	await vaccine.save((err) => {
		if (err) return res.json({ success: false, message: err.message });
		else
			return res.json({ success: true, message: "vaccine Added Successfully" });
	});
});

route.get("/get", (req, res) => {
	vaccinemodel.find((err, vaccines) => {
		if (err) return res.json({ success: false, message: err.message });
		else return res.json({ success: true, message: vaccines });
	});
});

route.get("/get/:id", (req, res) => {
	vaccinemodel.findById(req.params.id, (err, vaccines) => {
		if (err) return res.json({ success: false, message: err.message });
		else return res.json({ success: true, message: vaccines });
	});
});

route.patch("/update/:id", (req, res) => {
	vaccinemodel.findByIdAndUpdate(req.params.id, { ...req.body }, (err) => {
		if (err) return res.json({ success: false, message: err.message });
		else
			return res.json({
				success: true,
				message: "vaccine Updated Successfully",
			});
	});
});

route.delete("/delete/:id", (req, res) => {
	vaccinemodel.findByIdAndDelete(req.params.id, (err) => {
		if (err) return res.json({ success: false, message: err.message });
		else
			return res.json({
				success: true,
				message: "vaccine Deleted Successfully",
			});
	});
});

module.exports = route;
