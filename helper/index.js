const Joi = require("joi");

function validateUser(user) {
  const JoiSchema = Joi.object({
    email: Joi.string().required(),
    userName: Joi.required(),
    isAdmin: Joi.required(),
    favorites: Joi.array().items(Joi.string()), //Make sure each Id is a string
  }).options({ abortEarly: false });

  return JoiSchema.validate(user);
}

function validateActivity(activity) {
  const JoiSchema = Joi.object({
    location: Joi.string().required(),
    title: Joi.string().min(1).max(25).required(),
    info: Joi.string().required(),
    category: Joi.array().items(Joi.number()),
    website: Joi.string().required(),
    address: Joi.string().required(),
    image: Joi.object({
      name: Joi.string(),
      b64: Joi.string()
    }),
  }).options({ abortEarly: false });

  return JoiSchema.validate(activity);
}

function validateRequest(request) {
  const JoiSchema = Joi.object({
    // isPublic: Joi.bool().required(),
    // userId: Joi.string().required(),
    location: Joi.string().required(),
    title: Joi.string().required(),
    info: Joi.string().required(),
    category: Joi.array().items(Joi.number()),
    website: Joi.string().required(),
    address: Joi.string().required(),
    image: Joi.object({
      name: Joi.string(),
      b64: Joi.string()
    }),
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
