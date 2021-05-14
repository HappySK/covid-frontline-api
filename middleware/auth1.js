const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");

const auth1 = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, "secret");

    const adminuser = await Admin.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    console.log(adminuser);

    //for admin if there is
    // if(decoded.role === 'admin'){
    //  adminuser = await AdminSchema.findOne({ _id: decoded._id, 'tokens.token': token })
    // }

    if (!adminuser) {
      throw new Error();
    }

    req.token = token;
    req.adminuser = adminuser;
    next();
  } catch (e) {
    res.status(401).send({ error: "Please authenticate." });
  }
};

module.exports = auth1;
