const express = require("express");
const BloodGroup = require("../models/bloodgroup");
const cors = require("cors");
const mongoose = require("mongoose");
const router = express.Router();

router.post("/addbloodgroup", (req, res) => {
  const postdata = new BloodGroup({
    bloodgroup: req.body.bloodgroup,
  });

  console.log(req.body);

  postdata.save(function (err, vid) {
    if (err) {
      res.send(err);
    } else {
      res.status(201).send(vid);
    }
  });
});

router.get("/allbloodgroups", async (req, res) => {
  try {
    const postdata = await BloodGroup.find();

    res.status(200).json(postdata);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.get("/update_bloodgroup/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const postdata = await BloodGroup.findById(id);

    res.status(200).json(postdata);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
router.put("/update_bloodgroup_patch/:id", async (req, res) => {
  const { id } = req.params;
  const { bloodgroup } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const updatepost = { bloodgroup, _id: id };

  await BloodGroup.findByIdAndUpdate(id, updatepost);

  res.json(updatepost);
});

router.delete("/delete_bloodgroup/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  await BloodGroup.findByIdAndRemove(id);

  res.json({ message: "Post deleted successfully." });
});

module.exports = router;
