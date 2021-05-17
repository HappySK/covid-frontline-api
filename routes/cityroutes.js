const express = require("express");
const City = require("../models/city");
const mongoose = require("mongoose");
const router = express.Router();
const cors = require("cors");
router.post("/addcity", (req, res) => {
  const postdata = new City({
    city: req.body.city,
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

router.get("/allcity", async (req, res) => {
  try {
    const postdata = await City.find();

    res.status(200).json(postdata);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.get("/update_city/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const postdata = await City.findById(id);

    res.status(200).json(postdata);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
router.put("/update_city_patch/:id", async (req, res) => {
  const { id } = req.params;
  const { city, country } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const updatepost = { city, country, _id: id };

  await City.findByIdAndUpdate(id, updatepost);

  res.json(updatepost);
});

router.delete("/delete_city/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  await City.findByIdAndRemove(id);

  res.json({ message: "Post deleted successfully." });
});
router.get("/cityvalues/:query", cors(), (req, res) => {
  var query = req.params.query;

  City.find(
    {
      country: query,
    },
    (err, result) => {
      if (err) throw err;
      if (result) {
        res.json(result);
      } else {
        res.send(
          JSON.stringify({
            error: "Error",
          })
        );
      }
    }
  );
});
module.exports = router;
