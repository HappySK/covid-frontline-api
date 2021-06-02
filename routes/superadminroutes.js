const express = require("express");
const SuperAdmin = require("../models/superadmin");
const bcrypt = require("bcryptjs");
const auth = require("../middleware/auth");
const { ensureAuthenticated } = require("../config/auth");
const router = express.Router();
//Register
router.post("/superadminusers", async (req, res) => {
	//to create a req.

	const value = new SuperAdmin(req.body);
	try {
		await value.save();
		const token = value.generateAuthToken();
		res.status(201).send({ value, token });
	} catch (e) {
		res.status(500).send(e);
	}
});
//to login a user

router.post("/superadminlogin", async (req, res) => {
	try {
		console.log("dwdwwd");
		const user = await SuperAdmin.findBylogin(
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
router.get("/superadminlogout", auth, (req, res) => {
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

// router.get(
//   "/superadminchangepassword",
//   ensureAuthenticated,
//   function (req, res) {
//     SuperAdmin.findById(req.user, err => {
//       if (err) {
//         return res.status(401).send();
//       }

//       res.render("superadminchangepassword", {
//         user: req.user,
//       });
//     });
//   }
// );

// router.post("/superadminchangepassword", auth, function (req, res) {
//   const { password, passwordnew, passwordconfirm } = req.body;
//   console.log("before");
//   console.log(req.user);
//   console.log("after");
//   // console.log(req.user._id + "id");

//   SuperAdmin.findById(req.user._id, (err, data) => {
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
// router.post("/superadminchangepassword", auth, function (req, res) {
//   const { password, passwordnew, passwordconfirm } = req.body;

//   console.log(req.user);
//   console.log(req.user._id + "id");

//   SuperAdmin.findById(req.user._id, (err, data) => {
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

// router.post("/superadminchangepassword", auth, function (req, res) {
//   const { password, passwordnew, passwordconfirm } = req.body;

//   console.log(req.user);
//   console.log(req.user._id + "id");

//   SuperAdmin.findById(req.user._id, (err, data) => {
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

router.post("/superadminchangepassword", auth, async (req, res) => {
	try {
		const { password, newpassword, userid } = req.body;

		console.log(userid);

		const data = await SuperAdmin.findById(req.user._id);
		if (!data) {
			res.send("no user found");
		}
		console.log(data.password);
		console.log(password);

		const isPasswordCorrect = await bcrypt.compare(password, data.password);
		//  data.password = newpassword
		if (!isPasswordCorrect)
			return res.json({ success: false, message: "Incorrect Old Password" });

		const hashed = await bcrypt.hash(newpassword, 8);

		const update = await SuperAdmin.findByIdAndUpdate(
			userid,
			{ isFirstLogin: false, password: hashed },
			{ new: true }
		);
		console.log(update);
		res
			.status(200)
			.json({ success: true, message: "Password successfully reset" });
	} catch (e) {
		console.log(e);
		res.send(e);
	}
});
module.exports = router;
