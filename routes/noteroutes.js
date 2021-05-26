const express = require("express");
const Note = require("../models/note");

const cors = require("cors");
const mongoose = require("mongoose");
const router = express.Router();

router.post("/addnote", (req, res) => {
  const postdata = new Note({
    addedby: req.body.addedby,
    addedname:req.body.addedname,
    patientid: req.body.patientid,
    note: req.body.note,
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

router.get("/allnotes", async (req, res) => {
  try {
    const postdata = await Note.find();

    res.status(200).json(postdata);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.get("/update_note/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const postdata = await Note.findById(id);

    res.status(200).json(postdata);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
router.put("/update_note_patch/:id", async (req, res) => {
  const { id } = req.params;
  const { addedby,addedname, patientid, note } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const updatepost = { addedby,addedname, patientid, note, _id: id };

  await Note.findByIdAndUpdate(id, updatepost);

  res.json(updatepost);
});

router.delete("/delete_note/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  await Note.findByIdAndRemove(id);

  res.json({ message: "Post deleted successfully." });
});
router.get("/notes/:query", cors(), (req, res) => {
  var query = req.params.query;

  Note.find(
    {
      patientid: query,
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
