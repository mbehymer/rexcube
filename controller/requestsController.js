const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
// const valid = require('../helper');

const getAllRequests = async (req, res) => {
    res.status(200).json('Get all requests');
}

const getRequestByUserId = async (req, res) => {
    res.status(200).json('Get request by userId');
}

const createNewRequest = async (req, res) => {

    try {
        
        let activity = {
            activityId: ObjectId(),
            userId: req.body.userId,
            location: req.body.location,
            title: req.body.title,
            info: req.body.info,
            category: req.body.category,
            webLink: req.body.webLink
        };

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


    res.status(201).json('Post new request');
}

const updateRequest = async (req, res) => {
    try{
        const requestId = new ObjectId(req.params.requestId);
        const result = new mongodb.getDb().db('rexcube').collection('requests').replaceOne({_id:requestId}, req.body);
        if (result.modifiedCount != 0) {
            res.status(204).send();
        } 
    } catch {
        res.status(500).send(err.message);
    }
}

const deleteRequest = async (req, res) => {
    try {
        const userIdString = new ObjectId(req.params.id);
    
        console.log(userIdString);
    
        const result = await mongodb
          .getDb()
          .db('rexcube')
          .collection('requests')
          .deleteOne({ _id: userIdString});
    
        console.log(`Results Deleted: ${result.deletedCount} `);
          if(result.deletedCount > 0){
            res.status(204).send();
            console.log(`Info was Deleted. Items Deleted ${result.deletedCount}`);
          }
      } catch (err) {
        res.status(200).json(err.message);
      }
}

module.exports = {getAllRequests, getRequestByUserId, createNewRequest, updateRequest, deleteRequest};