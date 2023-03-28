const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;
const valid = require("../helper/index");

const getUserById = async (req, res) => {
  // #swagger.tags = ['User']

  // res.send(JSON.stringify(req.oidc.user));
  try {
    const userId = new ObjectId(req.params.userId);
    const result = await mongodb
      .getDb()
      .db('rexcube')
      .collection('users')
      .find({ _id: userId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (error) {
    res.status(500).json(error.message || 'Some error occurred while getting the user.');
  }

};

const createUser = async (req, res) => {
  // #swagger.tags = ['User']
  // #swagger.description = "Create a new user"

  //#swagger.parameters = {
  //     "name": "body",
  //     "in": "body",
  //     "schema": {
  //       "type": "object",
  //       "properties": {
  //         "email": {
  //           "example": "myemail@email.com"
  //         },
  //         "userName": {
  //           "example": "any"
  //         },
  //          "isAdmin": {
  //           "example": false
  //         },
  //         "favorites": {
  //           "example": [8,4,12]
  //         }
  //       }
  //     }
  //   }

  try {
    const userEmail = req.oidc.user.email;

    var myCount = await mongodb
      .getDb()
      .db('rexcube')
      .collection('users').countDocuments({ email: userEmail });
    // console.log(myCount);

    if (myCount === 0) {
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
        res.status(201).json(result).send()
      } else {
        res.status(500).json({ err: 'Could not create a new Todo.' })
      }
    }
  } catch (error) {
    res.status(500).send(error.message || 'Some error occurred while creating the contact.');
  }
};

const updateUser = async (req, res) => {
  // #swagger.tags = ['User']
  // #swagger.description = "Update user by id"

  // #swagger.parameters['userId'] = {
  // "in": "path",
  // "required": true,
  // "type": "string"
  // },
  // {
  //   "name": "body",
  //   "in": "body",
  //   "schema": {
  //     "type": "object",
  //     "properties": {
  //       "email": {
  //         "example": "any"
  //       },
  //       "username":{
  //         "example":"any"
  //       },
  //       "favorites": {
  //         "example": [3,1,9]
  //       },
  //       "isAdmin":{
  //         "example":false
  //       }
  //     }
  //   }
  // }

  try {
    const userId = new ObjectId(req.params.requestId);
    const result = new mongodb.getDb().db('rexcube').collection('users').replaceOne({ _id: userId }, req.body);
    if (result.modifiedCount != 0) {
      res.status(204).send();
    }
  } catch {
    res.status(500).send(err.message);
  }
};

const deleteUser = async (req, res) => {
  // #swagger.tags = ['User']
  // #swagger.description = "Delete user by id"


  try {
    const userIdString = new ObjectId(req.params.id);

    console.log(userIdString);

    const result = await mongodb
      .getDb()
      .db('rexcube')
      .collection('users')
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

module.exports = {
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
