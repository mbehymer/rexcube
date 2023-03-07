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
    
    return "createActivity";
    
};

const getSingleActivityByCategory = async (req, res, next) => {
    
    return "getSingleActivityByCategory";
    
};

const deleteActivity = async (req, res, next) => {
    
    return "deleteActivity";
    
};


module.exports = { getActivity, getSingleActivityById, createActivity, getSingleActivityByCategory, deleteActivity };


