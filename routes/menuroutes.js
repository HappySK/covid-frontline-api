const express = require("express");
const mongoose = require("mongoose");
const Menu = require("../models/menu");
const cors = require("cors");
const router = express.Router();

router.post("/add_menu", (req, res) => {
  const postdata = new Menu({
    menu: req.body.menu,
    addedby:req.body.addedby,
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

router.get("/menus", async (req, res) => {
  try {
    const postdata = await Menu.find();

    res.status(200).json(postdata);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.get("/update_menu/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const postdata = await Menu.findById(id);

    res.status(200).json(postdata);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
router.put("/update_menu_patch/:id", async (req, res) => {
  const { id } = req.params;
  const { menu,addedby} = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const updatepost = { menu,addedby, _id: id };

  await Menu.findByIdAndUpdate(id, updatepost);

  res.json(updatepost);
});

router.delete("/delete_menu/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  await Menu.findByIdAndRemove(id);

  res.json({ message: "Post deleted successfully." });
});
router.get("/menuvalues/:query", cors(), (req, res) => {
  var query = req.params.query;

  Menu.find(
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

router.get("/getmenudescription/:menu", cors(), async (req, res) => {
  var menu = req.params;
  try {
    const Menu1 = await Menu.findOne(menu);

    res.status(200).json(Menu1);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});


router.get("/menuvalidation/:query", cors(), async (req, res) => {
var query = req.params.query;
  Menu.count({ menu: query }, function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
});
module.exports = router;

