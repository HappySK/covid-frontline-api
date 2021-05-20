const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Patient = require("../models/patient");
const router = express.Router();

router.post("/addpatient", (req, res) => {
  const postdata = new Patient({
    addedby: req.body.addedby,
    requestid: req.body.requestid,
    patient_at: req.body.patient_at,
    current_spo2: req.body.current_spo2,
    patient_location: req.body.patient_location,
    comorbidity_conditions: req.body.comorbidity_conditions,
    Priority: req.body.Priority,
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

router.get("/allpatients", async (req, res) => {
  try {
    const postdata = await Patient.find();

    res.status(200).json(postdata);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.get("/update_patient/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const postdata = await Patient.findById(id);

    res.status(200).json(postdata);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
router.put("/update_patient_patch/:id", async (req, res) => {
  const { id } = req.params;
  const {
    addedby,
    requestid,
    patient_at,
    current_spo2,
    patient_location,
    comorbidity_conditions,
    Priority,
  } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const updatepost = {
    addedby,
    requestid,
    patient_at,
    current_spo2,
    patient_location,
    comorbidity_conditions,
    Priority,
    _id: id,
  };

  await Patient.findByIdAndUpdate(id, updatepost);

  res.json(updatepost);
});

router.delete("/delete_patient/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  await Patient.findByIdAndRemove(id);

  res.json({ message: "Post deleted successfully." });
});
router.get("/patients/:query", cors(), (req, res) => {
  var query = req.params.query;

  Patient.find(
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
  Patient.findById(req.params.id, (err, auth) => {
    auth.status = false;

    auth.save(function (err, user) {
      if (err) {
        console.log(err);
      }
    });

    res.redirect("/patient/allpatients");
  });
});

router.get("/Activate/:id", (req, res) => {
  Patient.findById(req.params.id, (err, auth) => {
    auth.status = true;

    auth.save(function (err, aut) {
      if (err) {
        res.send({
          Success: "Error",
        });
      }
    });

    res.redirect("/patient/allpatients");
  });
});

module.exports = router;
