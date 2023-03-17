
const ObjectId = require('mongodb').ObjectId;
const mongodb = require('../db/connect.js');

async function checkUser(req, res, next) {

    try {
        const userEmail = req.oidc.user.email;

        const isUserAdded = await mongodb
            .getDb()
            .db('rexcube')
            .collection('users')
            .find({ email: userEmail }).count();

        if (isUserAdded === 0) {
            let userAccount = {
                email: req.oidc.user.email,
                userName: req.oidc.user.nickname,
                isAdmin: false,
                favorites: [],
            };

            const result = await mongodb
                .getDb()
                .db('rexcube')
                .collection('users')
                .insertOne(userAccount);
            if (result.acknowledged) {
                res.status(201).json(result)
            } else {
                res.status(500).json({ err: 'Could not create a new Todo.' })
            }
        }
    } catch (error) {
        res.status(500).json(error.message || 'Some error occurred while creating the contact.');
    }
}




module.exports = { checkUser };