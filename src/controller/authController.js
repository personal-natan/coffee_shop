const User = require("../models/userModel");
const controller = {};

const CRUD = require("../controller/index");

const { signJwt } = require("../middleware/jwt");
const HashPass = require("../middleware/hash");
const hash = new HashPass();

function token(data) {
  const token = signJwt({
    id: data.id,
    email: data.email,
  });
  return token;
}

controller.login = async (req, res) => {
  const crud = new CRUD(User, req, res);

  const givenPassword = req.body.password;
  const { password, email, id } = await crud.login(req.body.username);

  const valid = await hash.validateUser(password, givenPassword);

  if (valid) {
    res.status(200).json({
      message: "login succesfully",
      token: token({ id, email }),
    });
  } else {
    res.status(401).json({ message: "wrong password" });
  }
};

controller.register = async (req, res) => {
  const crud = new CRUD(User, req, res);
  const registerData = await crud.register();

  res.status(200).json({
    message: "registration completed",
    data: registerData,
    token: token(registerData),
  });
};

module.exports = controller;
