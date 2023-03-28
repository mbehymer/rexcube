const Joi = require("joi");

function validateUser(user) {
  const JoiSchema = Joi.object({
    email: Joi.email().required(),
    userName: Joi.min(5).max(20).required(),
    isAdmin: Joi.required(),
    favorites: Joi.array().items(Joi.string()), //Make sure each Id is a string
  }).options({ abortEarly: false });

  return JoiSchema.validate(user);
}

function validateActivity(activity) {
  const JoiSchema = Joi.object({
    activityId: Joi.number().required(),
    location: Joi.string().required(),
    title: Joi.string().min(1).max(25).required(),
    info: Joi.string().required(),
    category: Joi.array().items(Joi.string()), //Make sure each Id is a string
  }).options({ abortEarly: false });

  return JoiSchema.validate(activity);
}

function validateRequest(request) {
  const JoiSchema = Joi.object({
    // isPublic: Joi.bool().required(),
    userId: Joi.number().required(),
    location: Joi.string().required(),
    title: Joi.string().required(),
    info: Joi.string().required(),
    category: Joi.array().items(Joi.string()),
    website: Joi.string().required(),
    address: Joi.string().required(),
    image: Joi.string(),
  }).options({ abortEarly: false });

  return JoiSchema.validate(request);
}

function validateCategory(category) {
  const JoiSchema = Joi.object({
    category_name: Joi.string().required(),
    category_id: Joi.number().required(),
  }).options({ abortEarly: false });

  return JoiSchema.validate(category);
}

module.exports = {
  validateUser,
  validateActivity,
  validateRequest,
  validateCategory
};
