const express = require("express");
const mongoose = require("mongoose");
const TermsOfService = require("../models/termsofservice");
const router = express.Router();

router.post("/Addtermsofservices", (req, res) => {
  const postdata = new TermsOfService({
    description: req.body.description,
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

router.get("/termsofservicess", async (req, res) => {
  try {
    const postdata = await TermsOfService.find();

    res.status(200).json(postdata);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.get("/update_termsofservices/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const postdata = await TermsOfService.findById(id);

    res.status(200).json(postdata);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
router.put("/update_termsofservices_patch/:id", async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const updatepost = { description, _id: id };

  await TermsOfService.findByIdAndUpdate(id, updatepost);

  res.json(updatepost);
});

router.delete("/delete_termsofservices/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  await TermsOfService.findByIdAndRemove(id);

  res.json({ message: "Post deleted successfully." });
});

module.exports = router;
