const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
// Load User model
const SuperAdmin = require("../models/superadmin");

const { forwardAuthenticated } = require("../config/auth");

// Login Page
router.get("/superadminlogin", forwardAuthenticated, (req, res) =>
  res.render("login")
);

// Register Page
router.get("/superadminusers", forwardAuthenticated, (req, res) =>
  res.render("superadminusers")
);

// Register
router.post("/superadminusers", (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ msg: "Please enter all fields" });
  }

  if (password != password2) {
    errors.push({ msg: "Passwords do not match" });
  }

  if (password.length < 6) {
    errors.push({ msg: "Password must be at least 6 characters" });
  }

  if (errors.length > 0) {
    res.render("register", {
      errors,
      name,
      email,
      password,
      password2,
    });
  } else {
    SuperAdmin.findOne({ email: email }).then((user) => {
      if (user) {
        errors.push({ msg: "Email already exists" });
        res.render("superadminusers", {
          errors,
          name,
          email,
          password,
          password2,
        });
      } else {
        const newUser = new SuperAdmin({
          name,
          email,
          password,
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then((user) => {
                req.flash(
                  "success_msg",
                  "You are now registered and can log in"
                );
                res.redirect("/superadminauth/login");
              })
              .catch((err) => console.log(err));
          });
        });
      }
    });
  }
});

// Login
router.post("/superadminlogin", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/admin/dashboard",
    failureRedirect: "/superadminauth/login",
    failureFlash: true,
  })(req, res, next);
});

// Logout
router.get("/superadminlogout", (req, res) => {
  req.logout();
  req.flash("success_msg", "You are logged out");
  res.redirect("/superadminauth/login");
});

module.exports = router;
