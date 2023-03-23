const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;
const valid = require("../helper/index");

const createCategory = async (req, res) => {
    // #swagger.tags = ['Category']
    // #swagger.description = "Creat category"

  res.status(200).json("Create User");
};

const updateCategory = async (req, res) => {
  // #swagger.tags = ['Category']
  // #swagger.description = "Update category by id"

  //#swagger.parameters['categoryId'] = {
        //     "in": "path",
        //     "required": true,
        //     "type": "string"
        //   },
        //   {
        //     "name": "body",
        //     "in": "body",
        //     "schema": {
        //       "type": "object",
        //       "properties": {
        //         "category_name": {
        //           "example": "any"
        //         },
        //         "category_id": {
        //           "example": 3
        //         }
        //       }
        //     }
        //   }

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
