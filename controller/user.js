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
  try {
    const userIdString = new ObjectId(req.params.id);

    console.log(userIdString);

    const result = await mongodb
      .getDb()
      .db('rexcube')
      .collection('users')
      .deleteOne({ _id: userIdString});

    console.log(`Results Deleted: ${result.deletedCount} `);
      if(result.deletedCount > 0){
        res.statis(204).send();
        console.log(`Info was Deleted. Items Deleted ${result.deletedCount}`);
      }
  } catch (err) {
    res.status.json(err.message);
  }
};

module.exports = {
  getUserLogin,
  getUserLogout,
  createUser,
  updateUser,
  deleteUser
};
