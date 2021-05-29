const express = require("express");
const mongoose = require("mongoose");
const SubMenu = require("../models/submenu");
const cors = require("cors");
const router = express.Router();

router.post("/add_submenu", (req, res) => {
  const postdata = new SubMenu({
    menu: req.body.menu,
    submenu:req.body.submenu,
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

router.get("/submenus", async (req, res) => {
  try {
    const postdata = await SubMenu.find();

    res.status(200).json(postdata);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.get("/update_submenu/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const postdata = await SubMenu.findById(id);

    res.status(200).json(postdata);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
router.put("/update_submenu_patch/:id", async (req, res) => {
  const { id } = req.params;
  const { menu,submenu,addedby} = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const updatepost = { menu,submenu,addedby, _id: id };

  await SubMenu.findByIdAndUpdate(id, updatepost);

  res.json(updatepost);
});

router.delete("/delete_submenu/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  await SubMenu.findByIdAndRemove(id);

  res.json({ message: "Post deleted successfully." });
});
router.get("/submenuvalues/:query", cors(), (req, res) => {
  var query = req.params.query;

  SubMenu.find(
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
router.get("/submenuvalues1/:query", cors(), (req, res) => {
  var query = req.params.query;

  SubMenu.find(
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

router.get("/getsubmenudescription/:submenu", cors(), async (req, res) => {
  var submenu = req.params;
  try {
    const Menu1 = await SubMenu.findOne(submenu);

    res.status(200).json(Menu1);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;
