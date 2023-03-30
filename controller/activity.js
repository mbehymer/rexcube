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

const createActivity = async (req, res, next) => {
    // #swagger.tags = ['Activity']
    // #swagger.description = "Create a new activity(admin only)"

    // /* swagger.parameters['title'] = {"example":"Hiking trail"} */
    // /* swagger.parameters['location'] ={"example":"North, South of Rexburg"} */
    // /* swagger.parameters['address'] ={"example":"123 street blvd, rexburg, ID"} */
    // /* swagger.parameters['info'] = {"example":"cool place you should visit"}*/
    // /* swagger.paramters['category'] = {"example": [8,4,11,2]} */
    // /* swagger.paramters['website'] = {"example": "place.com"} */
    // /* swagger.parameters['image'] ={"type":"object", "example":{"name": "mango shop", "b64":"super long random string"}} */


 
  try {
      const response = valid.validateActivity(req.body);
          if(response.error){
            res.status(422).json(response.error.message);
            return;
          }

    let activity = {
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
      .insertOne(req.body);
    if (result.acknowledged) {
      res.status(201).json(result)
    } else {
      res.status(500).json({ err: 'Could not create a new Todo.' })
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


