const express = require("express");
const Request = require("../models/request");
const cors = require("cors");
const mongoose = require("mongoose");
const router = express.Router();

router.post("/addrequest", (req, res) => {
  const postdata = new Request({
    addedby: req.body.addedby,
    patient_name: req.body.patient_name,
    patient_mobilenumber: req.body.patient_mobilenumber,
    patient_requirement: req.body.patient_requirement,
    patient_stage: req.body.patient_stage,
    guardian_name: req.body.guardian_name,
    guardian_mobilenumber: req.body.guardian_mobilenumber,
    comments: req.body.comments,

    patient_at: req.body.patient_at,
    current_spo2: req.body.current_spo2,
    patient_location: req.body.patient_location,
    comorbidity_conditions: req.body.comorbidity_conditions,
    Priority: req.body.Priority,
    comments1: req.body.comments1,
    status: true,
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

router.get("/allrequests", async (req, res) => {
  try {
    const postdata = await Request.find();

    res.status(200).json(postdata);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.get("/update_request/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const postdata = await Request.findById(id);

    res.status(200).json(postdata);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
router.put("/update_request_patch/:id", async (req, res) => {
  const { id } = req.params;
  const {
    patient_name,
    patient_mobilenumber,
    patient_requirement,
    patient_stage,
    guardian_name,
    guardian_mobilenumber,
    comments,

    patient_at,
    current_spo2,
    patient_location,
    comorbidity_conditions,
    Priority,
    comments1,
    addedby,
  } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const updatepost = {
    patient_name,
    patient_mobilenumber,
    patient_requirement,
    patient_stage,
    guardian_name,
    guardian_mobilenumber,
    comments,
    addedby,

    patient_at,
    current_spo2,
    patient_location,
    comorbidity_conditions,
    Priority,
    comments1,

    _id: id,
  };

  await Request.findByIdAndUpdate(id, updatepost);

  res.json(updatepost);
});

router.delete("/delete_request/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  await Request.findByIdAndRemove(id);

  res.json({ message: "Post deleted successfully." });
});
router.get("/requests/:query", cors(), (req, res) => {
  var query = req.params.query;

  Request.find(
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
  Request.findById(req.params.id, (err, auth) => {
    auth.status = false;

    auth.save(function (err, user) {
      if (err) {
        console.log(err);
      }
    });

    res.redirect("/request/allrequests");
  });
});

router.get("/Activate/:id", (req, res) => {
  Request.findById(req.params.id, (err, auth) => {
    auth.status = true;

    auth.save(function (err, aut) {
      if (err) {
        res.send({
          Success: "Error",
        });
      }
    });

    res.redirect("/request/allrequests");
  });
});

module.exports = router;
