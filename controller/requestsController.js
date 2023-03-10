const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
// const valid = require('../helper');

const getAllRequests = async (req, res) => {
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

    // {
    //     "userId": "1",
    //     "location": "North West",
    //     "title": "Rock Climbing",
    //     "info": "Student night Thursday $11, Rock Gym",
    //     "category": ["Indoors", "Active"],
    //     "webLink": "throckgymrexburg.com"
    //   }

    try {

        let request = {
            activityId: new ObjectId(),
            userId: req.body.userId,
            location: req.body.location,
            title: req.body.title,
            info: req.body.info,
            category: req.body.category,
            webLink: req.body.webLink
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
    try {
        const requestId = new ObjectId(req.params.requestId);
        const result = new mongodb.getDb().db('rexcube').collection('requests').replaceOne({ _id: requestId }, req.body);
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
            .deleteOne({ _id: userIdString });

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