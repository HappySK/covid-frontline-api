const express = require("express");

const consultantmodel = require("../models/consultants.js");

const route = express.Router();

route.post("/add", async (req, res) => {
	const consultants = await new consultantmodel(req.body);
	consultants.save((err) => {
		if (err) return res.json({ success: false, message: err.message });
		else
			return res.json({
				success: true,
				message: "Consultant Added Successfully",
			});
	});
});

route.get("/get", async (req, res) => {
	consultantmodel.find((err, consultants) => {
		if (err) return res.json({ success: false, message: err.message });
		else return res.json({ success: true, message: consultants });
	});
});

route.get("/get/:id", async (req, res) => {
	consultantmodel.findById(req.params.id, (err, consultant) => {
		if (err) return res.json({ success: false, message: err.message });
		else
			return res.json({
				success: true,
				message: consultant,
			});
	});
});

route.patch("/update/:id", async (req, res) => {
	consultantmodel.findByIdAndUpdate(req.params.id, { ...req.body }, (err) => {
		if (err) return res.json({ success: false, message: err.message });
		else
			return res.json({
				success: true,
				message: "Consultant Updated Successfully",
			});
	});
});

route.delete("/delete/:id", async (req, res) => {
	consultantmodel.findByIdAndDelete(req.params.id, (err) => {
		if (err) return res.json({ success: false, message: err.message });
		else
			return res.json({
				success: true,
				message: "Consultant deleted Successfully",
			});
	});
});

module.exports = route;
