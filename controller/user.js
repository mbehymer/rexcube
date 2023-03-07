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
  try{
    const userId = new ObjectId(req.params.requestId);
    const result = new mongodb.getDb().db('rexcube').collection('users').replaceOne({_id:userId}, req.body);
    if (result.modifiedCount != 0) {
        res.status(204).send();
    } 
} catch {
    res.status(500).send(err.message);
}
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
