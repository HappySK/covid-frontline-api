const express = require("express");

const pharmamodel = require("../models/pharma.js");

const route = express.Router();

route.post("/add", async (req, res) => {
	const { resource, addedBy } = req.body;
	const pharma = await new pharmamodel({ resource, addedBy });
	await pharma.save((err) => {
		if (err) return res.json({ success: false, message: err.message });
		else
			return res.json({ success: true, message: "Pharma Added Successfully" });
	});
});

route.get("/get", (req, res) => {
	pharmamodel.find((err, pharmas) => {
		if (err) return res.json({ success: false, message: err.message });
		else return res.json({ success: true, message: pharmas });
	});
});

route.get("/get/:id", (req, res) => {
	pharmamodel.findById(req.params.id, (err, pharmas) => {
		if (err) return res.json({ success: false, message: err.message });
		else return res.json({ success: true, message: pharmas });
	});
});

route.patch("/update/:id", (req, res) => {
	pharmamodel.findByIdAndUpdate(req.params.id, { ...req.body }, (err) => {
		if (err) return res.json({ success: false, message: err.message });
		else
			return res.json({
				success: true,
				message: "Pharma Updated Successfully",
			});
	});
});

route.delete("/delete/:id", (req, res) => {
	pharmamodel.findByIdAndDelete(req.params.id, (err) => {
		if (err) return res.json({ success: false, message: err.message });
		else
			return res.json({
				success: true,
				message: "Pharma Deleted Successfully",
			});
	});
});

module.exports = route;
