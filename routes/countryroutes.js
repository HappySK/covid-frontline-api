const express = require("express");
const Country = require("../models/Country");
const mongoose = require("mongoose");
const router = express.Router();

router.post("/addcountry", (req, res) => {
  const postdata = new Country({
    country: req.body.country,
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

router.get("/allcountry", async (req, res) => {
  try {
    const postdata = await Country.find();

    res.status(200).json(postdata);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.get("/update_country/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const postdata = await Country.findById(id);

    res.status(200).json(postdata);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
router.put("/update_country_patch/:id", async (req, res) => {
  const { id } = req.params;
  const { country } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const updatepost = { country, _id: id };

  await Country.findByIdAndUpdate(id, updatepost);

  res.json(updatepost);
});

router.delete("/delete_country/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  await Country.findByIdAndRemove(id);

  res.json({ message: "Post deleted successfully." });
});

module.exports = router;
