const User = require("../models/userModel");
const controller = {};

const CRUD = require("../controller/index");

controller.getAllUser = (req, res) => {
  const crud = new CRUD(User, req, res);
  crud.getAll();
};

controller.createNewUser = (req, res) => {
  const crud = new CRUD(User, req, res);
  crud.createNew();
};

controller.updateUser = (req, res) => {
  const crud = new CRUD(User, req, res);
  crud.updateData(req.body, req.params.id);
};

controller.deleteUser = (req, res) => {
  const crud = new CRUD(User, req, res);
  crud.deleteData(req.params.id);
};

module.exports = controller;
