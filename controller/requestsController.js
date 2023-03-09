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
    res.status(201).json('Post new request');
}

const updateRequest = async (req, res) => {
    res.status(200).json('Update request by request Id');
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