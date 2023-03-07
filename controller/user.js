const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;
const valid = require("../helper/index");

const getUserLogin = async (req, res) => {
  res.status(200).json("Get User Login");
};

const getUserLogout = async (req, res) => {
  res.status(200).json("Logout User");
};

const createUser = async (req, res) => {
  res.status(200).json("Create User");
};

const updateUser = async (req, res) => {
  res.status(200).json("Update User");
};

const deleteUser = async (req, res) => {
  res.status(200).json("Delete User");
};

module.exports = {
  getUserLogin,
  getUserLogout,
  createUser,
  updateUser,
  deleteUser,
};
