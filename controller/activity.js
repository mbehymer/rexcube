const ObjectId = require('mongodb').ObjectId;
const valid = require("../helper/index.js");
// const client = require('mongodb').ObjectId;

const mongodb = require('../db/connect.js');

const getActivity = async (req, res, next) => {
    // #swagger.tags = ['Activity']
      // #swagger.description = "Get all the activities"



  try {
    const result = await mongodb
      .getDb()
      .db('rexcube')
      .collection('activity').find();
    result.toArray().then((activites) => {
      res.status(200).json(activites);
    });
  } catch (err) {
    res.status(500).json(err);
  }

};

const getSingleActivityById = async (req, res, next) => {
  // #swagger.tags = ['Activity']
  // #swagger.description = "Get a specific activity by its id"

  try {
    const activityId = new ObjectId(req.params.activityId);
    const result = await mongodb
      .getDb()
      .db('rexcube')
      .collection('activity')
      .find({ _id: activityId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (error) {
    res.status(500).json(error.message || 'Some error occurred while creating the contact.');
  }

};


const getSingleActivityByCategory = async (req, res, next) => {

  // #swagger.tags = ['Activity']
  // #swagger.description = "Get activity by category"

  // WORKING!!!


  try {
    const categoryId = req.params.categoryId;
    const categoryIdInt = parseInt(categoryId)

    const result = await mongodb
      .getDb()
      .db('rexcube')
      .collection('activity')
      .find({ category: { $in: [categoryIdInt] } });


    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (error) {
    res.status(500).json(error.message || 'Some error occurred while creating the contact.');
  }

};


const isAdmin = async () => {
  try {
    const email = req.oidc.user.email;
    const result = await mongodb
      .getDb()
      .db('rexcube')
      .collection('users')
      .find({ email: email });
    return result.isAdmin
  } catch (error) {
    // res.status(500).json(error.message || 'Some error occurred while getting the user.');
  }

}


const createActivity = async (req, res, next) => {
    // #swagger.tags = ['Activity']
    // #swagger.description = "Create a new activity(admin only)"

    //#swagger.parameters = {
    //     "name": "body",
    //     "in": "body",
    //     "schema": {
    //       "type": "object",
    //       "properties": {
    //         "title": {
    //           "example": "any"
    //         },
    //         "info": {
    //           "example": "any"
    //         },
    //          "location": {
    //           "example": "any"
    //         },
    //         "category": {
    //           "example": [1,9]
    //         },
    //         "website": {
    //           "example": "any"
    //         },
    //         "address": {
    //            "example":"any"
    //          },
    //         "image": {
    //            "example": {
    //              "name": {
    //                  "example": "image name"
    //                },
    //              "b64": {
    //                  "example": "a very long bas 64 string"
    //                }
    //              }
    //           }
    //       }
    //     }
    //   }
 
  try {

    if (isAdmin()) {

      const response = valid.validateRequest(req.body);
          if(response.error){
            res.status(422).json(response.error.message);
            return;
          }

      let activity = {
        act_id: new ObjectId(),
        location: req.body.location,
        title: req.body.title,
        info: req.body.info,
        category: req.body.category,
        website: req.body.website,
        addres: req.body.address,
        image: req.body.image
      };

      const result = await mongodb
        .getDb()
        .db('rexcube')
        .collection('activity')
        .insertOne(activity);
      if (result.acknowledged) {
        res.status(201).json(result)
      } else {
        res.status(500).json({ err: 'Could not create a activity.' })
      }
    } else {
      res.status(422).json({ err: 'Admin Level is required to access.' })
    }
  } catch (err) {
    console.log("insertActivity: ", err)
  }
};


const deleteActivity = async (req, res, next) => {
  // #swagger.tags = ['Activity']
  // #swagger.description = "Delete activity by id"


  try {
    const userIdString = new ObjectId(req.params.id);

    console.log(userIdString);

    const result = await mongodb
      .getDb()
      .db('rexcube')
      .collection('activity')
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


module.exports = { getActivity, getSingleActivityById, createActivity, getSingleActivityByCategory, deleteActivity };


