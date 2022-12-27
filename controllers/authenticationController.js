const User = require("../models/userModel");
const { userTypeConstants,userStatusConstants} = require("../utils/constants");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../congif/authCongif");

exports.signUp = async function (req, res) {
  console.log(req.body);
  let userStatus = req.body.userStatus;

  if (
    req.body.userType == userTypeConstants.engineer ||
    req.body.userType == userTypeConstants.admin
  ) {
    userStatus = userStatusConstants.pending;
  } else {
    userStatus = userStatusConstants.approved;
  }

  const userObj = {
    name: req.body.name,
    userId: req.body.userId,
    userType: req.body.userType,
    password: bcrypt.hashSync(req.body.password, 8),
    email: req.body.email,
    userStatus: req.body.userStatus,
  };

  try {
    const userCreated = await User.create(userObj);
    res.status(200).send(userCreated);
  } catch (error) {
    console.log("something went wrong", error);
    res.status(500).send({
      message: "Some internal error while inserting the user",
    });
  }
};

exports.signIn = async function (req, res) {
 try{
     const user = await User.findOne({
    userId: req.body.userId,
  });
  if (!user) {
   return  res.status(404).send({ msg: "User does not exsist" });
  }

  if (user.userStatus !== userStatusConstants.approved) {
    res.status(403).send({
      msg: `Can't allow user to sign in as user is under ${user.userStatus}`,
    });
  }
  const isPasswordValid = bcrypt.compare(user.password,req.body.password);
  if (!isPasswordValid) {
     res.status(401).send({
      msg: "Invalid credentials",
    });
  }
  else{
    const token = jwt.sign(
    {
      id: user.userId,
    },
    config.SECRET_KET,
    {
      expiresIn: 84600,
    }
  );

  res.status(200).send({
    name:user.name,
    email:user.email,
    token:token,
    userId:user.userId
  })
  }
 }
 catch(err){
    console.log(err);
    res.status(500).send({msg:"Internal server error"})
 }
};
