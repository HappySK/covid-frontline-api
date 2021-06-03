const express = require("express");
const route = express.Router();

const socialmediamodel = require("../models/socialmedia");

route.post("/addsocialmedia", async (req, res) => {
	try {
		const socialmedialinks = await new socialmediamodel(req.body);
		socialmedialinks.save((err, socialmedialinks) => {
			if (err)
				return res.json({
					success: false,
					message: "Unable to save. Kindly try again",
				});
			else return res.json({ success: true, message: socialmedialinks });
		});
	} catch (error) {
		return res.json({ success: false, message: error.message });
	}
});

route.get("/getsocialmedia", async (req, res) => {
	try {
		socialmediamodel.findById(
			"60b8f26e0e25882e54891409",
			(err, socialmedialinks) => {
				if (err)
					return res.json({
						success: false,
						message: "Unable to Get Social Media Details. Kindly try again",
					});
				else return res.json({ success: true, message: socialmedialinks });
			}
		);
	} catch (error) {
		return res.json({ success: false, message: error.message });
	}
});

route.patch("/updatesocialmedia/:id", async (req, res) => {
	try {
		socialmediamodel.findByIdAndUpdate(
			req.params.id,
			{ ...req.body },
			(err, socialmedialinks) => {
				if (err)
					return res.json({
						success: false,
						message: "Unable to Update. Kindly try again",
					});
				else return res.json({ success: true, message: socialmedialinks });
			}
		);
	} catch (error) {
		return res.json({ success: false, message: error.message });
	}
});

module.exports = route;
