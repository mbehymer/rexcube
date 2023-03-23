const ObjectId = require('mongodb').ObjectId;
const valid = require("../helper/index.js");
// const client = require('mongodb').ObjectId;

const mongodb = require('../db/connect.js');

const getActivity = async (req, res, next) => {
    /* 
    #swagger.tags = [
      {
        name: 'Activity'
      }
    ]
    */
  // NOT WORKING
  try {
    const result = await mongodb.getDb()
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
    /* 
    #swagger.tags = [
      {
        name: 'Activity'
      }
    ]
    */
  // WORKING!!!

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
    /* 
    #swagger.tags = [
      {
        name: 'Activity'
      }
    ]
    */
    
  // WORKING!!!

  try {
    const categoryId = new ObjectId(req.params.categoryId);
    const result = await mongodb
      .getDb()
      .db('rexcube')
      .collection('activity')
      .find({ categoryId: categoryId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (error) {
    res.status(500).json(error.message || 'Some error occurred while creating the contact.');
  }

};

const createActivity = async (req, res, next) => {
  // .description = 'This route creates the activity, this will only be accessed by admins and even then the admin will not input the information, but rather pass the request activity file.'
  /* 
    #swagger.tags = [
      {
        name: 'Activity'
      }
      ]
    #swagger.description = 'This route creates the activity, this will only be accessed by admins and even then the admin will not input the information, but rather pass the request activity file.'
    #swagger.parameters = [
      {
        'name': 'body',
        'in': 'body',
        'description': 'Some description about the activity',
        'schema': {
              'location': "North",
              'title': "Name of Activity",
              'info': 'Time, cost, etc., about the activity.',
              'category': [
                  1,
                  5,
                  7,
              ]
            ,
              'website': 'https://somewebsite.com',
          }
      }
    ]
        
} */
  try {

    let activity = {
      act_id: new ObjectId(),
      location: req.body.location,
      title: req.body.title,
      info: req.body.info,
      category: req.body.category,
      website: req.body.website,
    };
    // console.log(todo);
    // console.log()

    const response = valid.validateContact(todo);
    if (response.error) {
        res.status(422).json(response.error.message);
        return;
    }

    const result = await mongodb
      .getDb()
      .db('rexcube')
      .collection('activity')
      .insertOne(activity);
    if (result.acknowledged) {
      res.status(201).json(result)
    } else {
      res.status(500).json({ err: 'Could not create a new Todo.' })
    }
  } catch (err) {
    console.log("insertTodo: ", err)
  }
};


const deleteActivity = async (req, res, next) => {
    /* 
    #swagger.tags = [
      {
        name: 'Activity'
      }
    ]
    */
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


