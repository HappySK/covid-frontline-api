const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const AdminSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	city: {
		type: String,
		required: true,
	},
	country: {
		type: String,
		required: true,
	},
	status: {
		type: Boolean,
		default: true,
	},
	isFirstLogin: {
		type: Boolean,
		default: true,
	},
	resourceid: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Resource",
		},
	],
	// resourcedetail: [
	//   {
	//     resourceid: {
	//       type: mongoose.Schema.Types.ObjectId,
	//       ref: "Resource",
	//     },
	//     status: {
	//       type: Boolean,
	//     },
	//   },
	// ],
	date: {
		type: Date,
		default: Date.now,
	},
	tokens: [
		{
			token: {
				type: String,
			},
		},
	],
});

//for hiding sensitive data like password and token from response send back to user
AdminSchema.methods.toJSON = function () {
	const user = this;
	const userobj = user.toObject();

	delete userobj.password;
	delete userobj.token;

	return userobj;
};
//generating jwt token(authentication) for login/signup
AdminSchema.methods.generateAuthToken = async function () {
	const user = this;
	const token = jwt.sign({ _id: user._id.toString() }, "secret");
	user.tokens = user.tokens.concat({ token });

	await user.save();
	return token;
};
//login user
AdminSchema.statics.findBylogin = async (email, password) => {
	const user = await Admin.findOne({ email });
	if (!user) {
		throw new Error("unable to login");
	}
	const isMatch = await bcrypt.compare(password, user.password);
	if (!isMatch) {
		throw new Error("unable to login");
	}
	return user;
};

//for converting plain pass to hashed one
AdminSchema.pre("save", async function (next) {
	const user = this;
	if (user.isModified("password")) {
		user.password = await bcrypt.hash(user.password, 8);
	}

	next();
});

const Admin = mongoose.model("Admin", AdminSchema);

module.exports = Admin;
