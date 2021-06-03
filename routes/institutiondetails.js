const express = require("express");
const mongoose = require("mongoose");
const route = express.Router();
const institutionModel = require("../models/institutiondetails");

route.post("/addinstitutiondetails", async (req, res) => {
	try {
		const institution = new institutionModel(req.body);
		await institution.save((err, institute) => {
			if (err) return res.json({ success: false, message: err.message });
			else
				return res.json({
					success: true,
					message: institute,
				});
		});
	} catch (error) {
		return res.json({ success: false, message: error.message });
	}
});

route.get("/getinstitutiondetails", async (req, res) => {
	try {
		await institutionModel.find((err, institution) => {
			if (err) return res.json({ success: false, message: err.message });
			else return res.json({ success: true, message: institution });
		});
	} catch (error) {
		return res.json({ success: false, message: error.message });
	}
});

route.get("/getinstitutiondetails/:id", async (req, res) => {
	try {
		const { id } = req.params;
		await institutionModel.findById(id, (err, institution) => {
			if (err) return res.json({ success: false, message: err.message });
			else return res.json({ success: true, message: institution });
		});
	} catch (error) {
		return res.json({ success: false, message: error.message });
	}
});

route.patch("/updateinstitutiondetails/:id", async (req, res) => {
	try {
		const { id } = req.params;
		await institutionModel.findByIdAndUpdate(
			id,
			{ ...req.body },
			(err, institution) => {
				if (err) return res.json({ success: false, message: err.message });
				else return res.json({ success: true, message: institution });
			}
		);
	} catch (error) {
		return res.json({ success: false, message: error.message });
	}
});

route.delete("/deleteinstitutiondetails/:id", async (req, res) => {
	try {
		const { id } = req.params;
		await institutionModel.findByIdAndDelete(id, (err, institution) => {
			if (err) return res.json({ success: false, message: err.message });
			else return res.json({ success: true, message: "Deleted Successfully" });
		});
	} catch (error) {
		return res.json({ success: false, message: error.message });
	}
});

module.exports = route;
