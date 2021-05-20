const express = require("express");
const mongoose = require("mongoose");
const administrator = require("../middleware/administrator");
const Administrator = require("../models/administrator");
const router = express.Router();
//Register
router.post("/administratorusers", async (req, res) => {
  //to create a req.

  const value = new Administrator(req.body);
  try {
    await value.save();
    const token = value.generateAuthToken();
    res.status(201).send({ value, token });
  } catch (e) {
    res.status(500).send(e);
  }
});

// router.put("/adminusers/city", async (user, cb) => {
//   Admin.find({ city: user.city }, function (err, docs) {
//     if (docs.length) {
//       cb("City Name already exists ", null);
//     } else {
//       user.save(function (err) {
//         cb(err, user);
//       });
//     }
//   });
// });
//to login a user
router.post("/administratorlogin", async (req, res) => {
  try {
    console.log("dwdwwd");
    const user = await Administrator.findBylogin(
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
router.get("/administratorlogout", administrator, (req, res) => {
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
//changepassword
// router.post("/adminchangepassword", auth1, function (req, res) {
//   const { password, passwordnew } = req.body;

//   console.log(req.user);
//   console.log(req.user._id + "id");

//   Admin.findById(req.user._id, (err, data) => {
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
//             res.redirect("/admin/dashboard");
//           });
//         });
//       });
//     });
//   });
// });
// router.post("/changepassword", function (req, res) {
//   const { password, passwordnew, passwordconfirm } = req.body;

//   console.log(req.user);
//   console.log(req.user._id + "id");

//   User.findById(req.user._id, (err, data) => {
//     if (err) {
//       console.log(err);
//     }

//     bcrypt.compare(password, data.password, (err, isMatch) => {
//       if (err) throw err;
//       if (!isMatch) {
//         res.send({
//           Error: "Password is Incorrect",
//         });
//       } else {
//         data.password = req.body.passwordnew;

//         bcrypt.genSalt(10, (err, salt) => {
//           bcrypt.hash(data.password, salt, (err, hash) => {
//             if (err) throw err;

//             data.password = hash;

//             data.save(function (err, Person) {
//               if (err) console.log(err);
//               else console.log("Success");
//               res.redirect("/admin/dashboard");
//             });
//           });
//         });
//       }
//     });
//   });
// });

// router.post("/changepassword", auth1, function (req, res) {
//   const { password, passwordnew, passwordconfirm } = req.body;

//   console.log(req.user);
//   console.log(req.user._id + "id");

//   Admin.findById(req.user._id, (err, data) => {
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
router.get("/administratorUsersList", async (req, res) => {
  try {
    const postdata = await Administrator.find();

    res.status(200).json(postdata);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.get("/update_administratorusers/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const postdata = await Administrator.findById(id);

    res.status(200).json(postdata);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
router.put("/update_administratorusers_patch/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, city, country, date } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const updatepost = {
    name,
    email,
    // password,
    city,
    country,
    date,
    // tokens,
    _id: id,
  };

  await Administrator.findByIdAndUpdate(id, updatepost);

  res.json(updatepost);
});

router.delete("/delete_administratorusers/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  await Administrator.findByIdAndRemove(id);

  res.json({ message: "Post deleted successfully." });
});

router.get("/suspenduser/:id", (req, res) => {
  Administrator.findById(req.params.id, (err, auth) => {
    auth.status = false;

    auth.save(function (err, user) {
      if (err) {
        console.log(err);
      }
    });

    res.redirect("/administrator/AdministratorUsersList");
  });
});

router.get("/makeliveuser/:id", (req, res) => {
  Administrator.findById(req.params.id, (err, auth) => {
    auth.status = true;

    auth.save(function (err, aut) {
      if (err) {
        res.send({
          Success: "Error",
        });
      }
    });

    res.redirect("/administrator/AdministratorUsersList");
  });
});
module.exports = router;
