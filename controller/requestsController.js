const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const valid = require('../helper');

const getAllRequests = async (req, res) => {
    // #swagger.tags = ['Activity Requests']
    // #swagger.description = "Get all the activity request"


    try {
        const result = await mongodb
            .getDb()
            .db('rexcube')
            .collection('requests').find();
        result.toArray().then((requests) => {
            res.status(200).json(requests);
        });
    } catch (err) {
        res.status(500).json(err);
    }
}

const getRequestByUserId = async (req, res) => {
    // #swagger.tags = ['Activity Requests']
    // #swagger.description = "Get request by id"



    try {
        const userId = req.params.userId;
        const result = await mongodb
            .getDb()
            .db('rexcube')
            .collection('requests')
            .find({ userId: userId });
        result.toArray().then((lists) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists);
        });
    } catch (error) {
        res.status(500).json(error.message || 'Some error occurred while creating the contact.');
    }
}

const createNewRequest = async (req, res) => {
    // #swagger.tags = ['Activity Requests']
    // #swagger.description = "Create a new activity request"

    // will need to add these lines for the image example when creating swagger 
    // {"name":  "any", "b64": "a very long bas 64 string"}

    // {
    //     "userId": "1",
    //     "location": "North West",
    //     "title": "Rock Climbing",
    //     "info": "Student night Thursday $11, Rock Gym",
    //     "category": ["Indoors", "Active"],
    //     "website": "throckgymrexburg.com"
    //   }


    try {

        const response = valid.validateRequest(req.body);
        if (response.error) {
            res.status(422).json(response.error.message);
            return;
        }

        let request = {
            location: req.body.location,
            title: req.body.title,
            info: req.body.info,
            category: req.body.category,
            website: req.body.website,
            address: req.body.address,
            image: { name: req.body.name, b64: req.body.b64 }
        };

        const result = await mongodb.getDb().db('rexcube').collection('requests')
            .insertOne(request);
        if (result.acknowledged) {
            res.status(201).json(result)
        } else {
            res.status(500).json({ err: 'Could not create a new Todo.' })
        }
    } catch (err) {
        console.log("insertTodo: ", err)
    }


    res.status(201).json('Post new request');
}

const updateRequest = async (req, res) => {
    // #swagger.tags = ['Activity Requests']
    // #swagger.description = "Update activity request by id"
    // will need to add these lines for the image example when creating swagger 
    // {"name":  "any", "b64": "a very long bas 64 string"}


    try {
        let request = {
            userId: req.body.userId,
            location: req.body.location,
            title: req.body.title,
            info: req.body.info,
            category: req.body.category,
            website: req.body.website,
            address: req.body.address,
            image: req.body.image
        };

        const response = valid.validateRequest(req.body);
        if (response.error) {
            res.status(422).json(response.error.message);
            return;
        }
        const requestId = new ObjectId(req.params.requestId);
        const result = new mongodb.getDb().db('rexcube').collection('requests').replaceOne({ _id: requestId }, { $set: request });
        if (result.modifiedCount != 0) {
            res.status(204).send();
        }
    } catch {
        res.status(500).send(error.message);
    }
}

const deleteRequest = async (req, res) => {
    // #swagger.tags = ['Activity Requests']
    // #swagger.description = "Delete activity request by id"

    try {
        const requestId = new ObjectId(req.params.requestId);

        const result = await mongodb
            .getDb()
            .db('rexcube')
            .collection('requests')
            .deleteOne({ _id: requestId });

        console.log(`Results Deleted: ${result.deletedCount} `);
        if (result.deletedCount > 0) {
            res.status(204).send();
            console.log(`Info was Deleted. Items Deleted ${result.deletedCount}`);
        }
    } catch (err) {
        res.status(200).json(err.message);
    }
}

module.exports = { getAllRequests, getRequestByUserId, createNewRequest, updateRequest, deleteRequest };