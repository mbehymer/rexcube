const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;
const valid = require("../helper/index");

const createCategory = async (req, res) => {
  res.status(200).json("Create User");
};

const updateCategory = async (req, res) => {
  try{
    const categoryId = new ObjectId(req.params.categoryId);
    const result = new mongodb.getDb().db('rexcube').collection('category').replaceOne({_id:categoryId}, req.body);
    if (result.modifiedCount != 0) {
        res.status(204).send();
    } 
} catch {
    res.status(500).send(err.message);
}
};

module.exports = { createCategory, updateCategory };
