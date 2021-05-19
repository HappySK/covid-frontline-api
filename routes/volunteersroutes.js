const express = require("express");
const Volunteers = require("../models/volunteers");
const cors = require("cors");
const mongoose = require("mongoose");
const auth2 = require("../middleware/auth2");
// const { ensureAuthenticated } = require("../config/auth");
const router = express.Router();
//Register
router.post("/volunteersusers", async (req, res) => {
  //to create a req.

  const value = new Volunteers(req.body);
  try {
    await value.save();
    const token = value.generateAuthToken();
    res.status(201).send({ value, token });
  } catch (e) {
    res.status(500).send(e);
  }
});
//to login a user

router.post("/volunteerslogin", async (req, res) => {
  try {
    console.log("dwdwwd");
    const user = await Volunteers.findBylogin(
      req.body.email,
      req.body.password
    );
    console.log(user);
    const token = await user.generateAuthToken(); //this method generates a token for login users
    res.json({ user, token });
  } catch (e) {
    console.log(e);
    res.status(400).send();
  }
});
//logout
router.get("/volunteerslogout", auth2, (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    req.user.save();
    res.send("logout successful");
  } catch (e) {
    res.status(401).send(e);
  }
});

router.get("/volunteersList", async (req, res) => {
  try {
    const postdata = await Volunteers.find();

    res.status(200).json(postdata);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.get("/volunteers/:query", cors(), (req, res) => {
  var query = req.params.query;

  Volunteers.find(
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
// //changepassword

// router.get(
//   "/volunteerschangepassword",
//   ensureAuthenticated,
//   function (req, res) {
//     Volunteers.findById(req.user, (err) => {
//       if (err) {
//         return res.status(401).send();
//       }

//       res.render("superadminchangepassword", {
//         user: req.user,
//       });
//     });
//   }
// );

// router.post("/volunteerschangepassword", auth, function (req, res) {
//   const { password, passwordnew, passwordconfirm } = req.body;
//   console.log("before");
//   console.log(req.user);
//   console.log("after");
//   // console.log(req.user._id + "id");

//   Volunteers.findById(req.user._id, (err, data) => {
//     if (err) {
//       console.log(err);
//     }
//     bcrypt.compare(password, data.password, (err, isMatch) => {
//       if (err) {
//         res.send(err);
//       }
//       if (!isMatch) {
//         // res.send({
//         //   Error: "Password is Incorrect",
//         // });
//         console.log("not match");
//       }
//       data.password = passwordnew;
//       console.log(data.password);

//       bcrypt.genSalt(10, (err, salt) => {
//         bcrypt.hash(data.password, salt, (err, hash) => {
//           if (err) throw err;

//           data.password = hash;

//           data.save(function (err, Person) {
//             if (err) console.log(err);
//             else console.log("Success");
//             res.send(Person);
//           });
//         });
//       });
//     });
//   });
// });

router.get("/suspenduser/:id", (req, res) => {
  Volunteers.findById(req.params.id, (err, auth) => {
    auth.status = false;

    auth.save(function (err, user) {
      if (err) {
        console.log(err);
      }
    });

    res.redirect("/volunteers/volunteersList");
  });
});

router.get("/makeliveuser/:id", (req, res) => {
  Volunteers.findById(req.params.id, (err, auth) => {
    auth.status = true;

    auth.save(function (err, aut) {
      if (err) {
        res.send({
          Success: "Error",
        });
      }
    });

    res.redirect("/volunteers/volunteersList");
  });
});

router.get("/update_volunteers/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const postdata = await Volunteers.findById(id);

    res.status(200).json(postdata);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
router.put("/update_volunteers_patch/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, contact, addedby, date } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const updatepost = {
    name,
    email,
    // password,
    contact,
    addedby,
    date,
    // tokens,
    _id: id,
  };

  await Volunteers.findByIdAndUpdate(id, updatepost);

  res.json(updatepost);
});

router.delete("/delete_volunteers/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  await Volunteers.findByIdAndRemove(id);

  res.json({ message: "volunteers deleted successfully." });
});
module.exports = router;
