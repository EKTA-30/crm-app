const jwt = require("jsonwebtoken");
const authCongif = require("../congif/authCongif");
const {
  userTypeConstants,
  userStatusConstants,
} = require("../utils/constants");

const User = require("../models/userModel");
const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      msg: "Auth token is missing",
    });
  }

  jwt.verify(token, authCongif.SECRET_KET, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        msg: "Unauthorized access",
      });
    }

    req.body.userId = decoded.id;
    next();
  });
};

const isAdmin = async (req, res, next) => {
  const user = await User.findOne({
    userId: req.body.userId,
  });

  if (user && user.userType == userTypeConstants.admin) {
    next();
  } else {
    res.status(403).send({
      message: "Require Admin Role!",
    });
    return;
  }
};

module.exports = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
};
