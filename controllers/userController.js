const mongoose = require("mongoose");
const User = mongoose.model("ChatUser");
const sha256 = require("js-sha256");
const jwt = require("jwt-then");
const { Messages } = require('../helper/constant')

// function to check valid email
const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
exports.register = async (req, res) => {
  try {
  const { firstName, lastName, email, password } = req.body;

  // we can use other validations as well
  const validEmail = validateEmail(email)
  if (!validEmail) {
    return res.status(400).send({
      status: 400,
      message: Messages.INVALID_EMAIL,
    });
  }

  if (password.length < 6) {
    return res.status(400).send({
      status: 400,
      message: Messages.INVALID_PASSWORD,
    });
  };

  const userExists = await User.findOne({
    email,
  });

  if (userExists){
    return res.status(400).send({
      status: 400,
      message: Messages.ALREADY_EXISTS_WITH_EMAIL,
    });
  } 

  const user = new User({
    firstName,
    lastName,
    email,
    password: sha256(password + process.env.SALT),
  });
  await user.save();

  return res.status.send({
    status: 200,
    message: Messages.USER_CREATED,
    data: {}
  });
  } catch (error) {
    return res.status(500).send({
      status: 500,
      message: error.message,
    });
  }
  
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // mask the password before saving it to DB
  const user = await User.findOne({
    email,
    password: sha256(password + process.env.SALT),
  });

  if (!user) {
    return res.status(400).send({
      status: 400,
      message: Messages.INVALID_DETAILS,
    });
  }

  const token = await jwt.sign({ id: user.id, firstName:user.firstName, lastName:user.lastName, email: user.email }, process.env.SECRET);

  return res.status(200).send({
    message: Messages.LOG_IN,
    token,
  });
  } catch (error) {
    return res.status(500).send({
      status: 500,
      message: error.message,
    });
  }
}

