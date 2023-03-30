const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;
const valid = require("../helper/index");

const createCategory = async (req, res) => {
  // #swagger.tags = ['Category']
  // #swagger.description = "Creat category"

  try {
    const response = valid.validateCategory(req.body);
    if (response.error) {
      res.status(422).json(response.error.message);
      return;
    }
    let category = {
      category_name: req.body.category_name,
      category_id: req.body.category_id
    }


    const result = await mongodb.getDb().db('rexcube').collection('category')
      .insertOne(category);
    if (result.acknowledged) {
      res.status(201).json(result)
    } else {
      res.status(500).json({ err: 'Could not create a new category.' })
    }
  } catch (err) {
    console.log("insertCategory: ", err)
  }
};

const updateCategory = async (req, res) => {
  // #swagger.tags = ['Category']
  // #swagger.description = "Update category by id"


  try {

    let category = {
      category_name: req.body.category_name,
      category_id: req.body.category_id
    }

    const response = valid.validateCategory(req.body);
    if (response.error) {
      res.status(422).json(response.error.message);
      return;
    }
    const categoryId = new ObjectId(req.params.categoryId);
    const result = await mongodb.getDb().db('rexcube').collection('category').replaceOne({ _id: categoryId }, category);
    if (result.modifiedCount != 0) {
      res.status(204).send();
    }
  } catch {
    res.status(500).send();
  }
};

module.exports = { createCategory, updateCategory };


