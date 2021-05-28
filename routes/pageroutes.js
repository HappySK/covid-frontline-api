const express = require("express");
const mongoose = require("mongoose");
const Page = require("../models/page");
const cors = require("cors");
const router = express.Router();

router.post("/Addpage", (req, res) => {
  const pagedata = new Page({
    title: req.body.title,
    description: req.body.description,
    menu: req.body.menu,
    submenu: req.body.submenu,
    addedby:req.body.addedby,
    selectoption:req.body.selectoption,
  });

  console.log(req.body);

  pagedata.save(function (err, vid) {
    if (err) {
      res.send(err);
    } else {
      res.status(201).send(vid);
    }
  });
});

router.get("/pages", async (req, res) => {
  try {
    const pagedata = await Page.find();

    res.status(200).json(pagedata);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.get("/update_page/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const pagedata = await Page.findById(id);

    res.status(200).json(pagedata);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
router.put("/update_page_patch/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, menu, submenu,addedby,selectoption } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No page with id: ${id}`);

  const updatepage = { title, description, menu, submenu,addedby,selectoption, _id: id };

  await Page.findByIdAndUpdate(id, updatepage);

  res.json(updatepage);
});

router.delete("/delete_page/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No page with id: ${id}`);

  await Page.findByIdAndRemove(id);

  res.json({ message: "page deleted successfully." });
});
router.get("/pagevalueswithsubmenu/:query", cors(), (req, res) => {
  var query = req.params.query;

  Page.find(
    {
      submenu: query,
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
router.get("/pagevalueswithmenu/:query", cors(), (req, res) => {
  var query = req.params.query;

  Page.find(
    {
      menu: query,
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

router.get("/allpagevalues/:query", cors(), (req, res) => {
  var query = req.params.query;

  Page.find(
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

module.exports = router;
