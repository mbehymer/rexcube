const ObjectId = require('mongodb').ObjectId;
// const valid = require("../helper/index.js");
const mongodb = require('../db/connect.js');

const getActivity = async (req, res, next) => {
    
    return "getActivity";
    
};

const getSingleActivityById = async (req, res, next) => {
    
    return "getSingleActivity";
    
};

const createActivity = async (req, res, next) => {
    
    try {
        
        let activity = {
            location: req.body.location,
            title: req.body.title,
            info: req.body.info,
            category: req.body.category
        };
        // console.log(todo);
        // console.log()

        // const response = valid.validateContact(todo);
        // if (response.error) {
        //     res.status(422).json(response.error.message);
        //     return;
        // }

        const result = await mongodb.getDb().db('rexcube').collection('activity')
            .insertOne(activity);
        if (result.acknowledged) {
                res.status(201).json(result)
        } else {
            res.status(500).json({err: 'Could not create a new Todo.'})
        }
    } catch (err) {
        console.log("insertTodo: ",err)
    }
};

const getSingleActivityByCategory = async (req, res, next) => {
    
    return "getSingleActivityByCategory";
    
};

const deleteActivity = async (req, res, next) => {
    
    try {
        const userIdString = new ObjectId(req.params.id);
    
        console.log(userIdString);
    
        const result = await mongodb
          .getDb()
          .db('rexcube')
          .collection('activity')
          .deleteOne({ _id: userIdString});
    
        console.log(`Results Deleted: ${result.deletedCount} `);
          if(result.deletedCount > 0){
            res.status(204).send();
            console.log(`Info was Deleted. Items Deleted ${result.deletedCount}`);
          }
      } catch (err) {
        res.status(200).json(err.message);
      }
    
};


module.exports = { getActivity, getSingleActivityById, createActivity, getSingleActivityByCategory, deleteActivity };


