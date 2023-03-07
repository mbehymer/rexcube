const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;
const valid = require("../helper/index");

const createCategory = async (req, res) => {
  res.status(200).json("Create User");
};

const updateCategory = async (req, res) => {
  res.status(200).json("Update User");
};

module.exports = { createCategory, updateCategory };
