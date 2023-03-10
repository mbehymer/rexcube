const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;
const valid = require("../helper/index");

const getUserLogin = async (req, res) => {
  // Will work once Oauth is implemented
  res.send(JSON.stringify(req.oidc.user));

};

const getUserLogout = async (req, res) => {
  res.status(200).json("Logout User");
};

const createUser = async (req, res) => {
  res.status(200).json("Create User");
};

const updateUser = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.requestId);
    const result = new mongodb.getDb().db('rexcube').collection('users').replaceOne({ _id: userId }, req.body);
    if (result.modifiedCount != 0) {
      res.status(204).send();
    }
  } catch {
    res.status(500).send(err.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    const userIdString = new ObjectId(req.params.id);

    console.log(userIdString);

    const result = await mongodb
      .getDb()
      .db('rexcube')
      .collection('users')
      .deleteOne({ _id: userIdString });

    console.log(`Results Deleted: ${result.deletedCount} `);
    if (result.deletedCount > 0) {
      res.status(204).send();
      console.log(`Info was Deleted. Items Deleted ${result.deletedCount}`);
    }
  } catch (err) {
    res.status(200).json(err.message);
  }
};

module.exports = {
  getUserLogin,
  getUserLogout,
  createUser,
  updateUser,
  deleteUser
};
