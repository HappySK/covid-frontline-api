const jwt = require("jsonwebtoken");
const SuperAdmin = require("../models/superadmin");

const auth = async (req, res, next) => {
	try {
		const token = req.header("Authorization").replace("Bearer ", "");
		const decoded = jwt.verify(token, "secret");

		const user = await SuperAdmin.findOne({
			_id: decoded._id,
			"tokens.token": token,
		});

		//for admin if there is
		// if(decoded.role === 'admin'){
		//  user = await AdminSchema.findOne({ _id: decoded._id, 'tokens.token': token })
		// }

		if (!user) {
			throw new Error();
		}

		req.token = token;
		req.user = user;
		next();
	} catch (e) {
		res.status(401).send({ error: "Please authenticate." });
	}
};

module.exports = auth;
