const jwt = require("jsonwebtoken");
const SignUp = require("../models/SignupSchema");
const Admin = require("../models/AdminSchema");

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    // console.log("this is token: ", token);
    const verifytoken = jwt.verify(token, process.env.KEYSECRET);
    // console.log(verifytoken);
    const rootuser = await SignUp.find({ _id: verifytoken._id });
    if (rootuser.length === 0) {
      const rootadmin = await Admin.find({ _id: verifytoken._id });
      if (rootadmin.length === 0) {
        console.log("hohoho");
        throw new Error("user not found");
      }
      // console.log("rot: ", rootadmin);
      req.token = token;
      req.rootadmin = rootadmin;
      req.userid = rootadmin[0]._id;
      next();
    } else {
      // console.log("rott: ", rootuser);
      req.token = token;
      req.rootuser = rootuser;
      req.userid = rootuser[0]._id;
      next();
    }
  } catch (error) {
    res
      .status(401)
      .json({ status: 401, message: "unauthorised, no token provide" });
  }
};

module.exports = authenticate;
