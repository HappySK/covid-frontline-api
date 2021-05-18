const express = require("express");
const Resource = require("../models/resource");
const cors = require("cors");
const mongoose = require("mongoose");
const router = express.Router();

router.post("/addresource", (req, res) => {
  const postdata = new Resource({
    addedby: req.body.addedby,
    name: req.body.name,
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

router.get("/allresources", async (req, res) => {
  try {
    const postdata = await Resource.find();

    res.status(200).json(postdata);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.get("/update_resource/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const postdata = await Resource.findById(id);

    res.status(200).json(postdata);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
router.put("/update_resource_patch/:id", async (req, res) => {
  const { id } = req.params;
  const { name, addedby } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const updatepost = { name, addedby, _id: id };

  await Resource.findByIdAndUpdate(id, updatepost);

  res.json(updatepost);
});

router.delete("/delete_resource/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  await Resource.findByIdAndRemove(id);

  res.json({ message: "Post deleted successfully." });
});
router.get("/resources/:query", cors(), (req, res) => {
  var query = req.params.query;

  Resource.find(
    {
      addedby: query,
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

router.get("/Inactivate/:id", (req, res) => {
  Resource.findById(req.params.id, (err, auth) => {
    auth.status = false;

    auth.save(function (err, user) {
      if (err) {
        console.log(err);
      }
    });

    res.redirect("/resource/allresources");
  });
});

router.get("/Activate/:id", (req, res) => {
  Resource.findById(req.params.id, (err, auth) => {
    auth.status = true;

    auth.save(function (err, aut) {
      if (err) {
        res.send({
          Success: "Error",
        });
      }
    });

    res.redirect("/resource/allresources");
  });
});
module.exports = router;
