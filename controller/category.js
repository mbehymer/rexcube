const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;
const valid = require("../helper/index");

const createCategory = async (req, res) => {
    // #swagger.tags = ['Category']
    // #swagger.description = "Creat category"
    const response = valid.validateCategory(req.body);
    if(response.error){
      res.status(422).json(response.error.message);
      return;
    }
  res.status(200).json("Created category");
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
    const response = valid.validateCategory(req.body);
        if(response.error){
          res.status(422).json(response.error.message);
          return;
        }
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
