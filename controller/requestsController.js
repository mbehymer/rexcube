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
    res.status(200).json('Delete request by request Id');
}

module.exports = {getAllRequests, getRequestByUserId, createNewRequest, updateRequest, deleteRequest};