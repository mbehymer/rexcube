const Joi = require("joi");

// function validateMovie(movie) {
//   const JoiSchema = Joi.object({
//     movie_id: Joi.string().min(1).max(2).required(),

//     title: Joi.string().min(1).max(50).required(),

//     rating: Joi.string().min(1).max(5).required(),

//     plot: Joi.string().min(20).max(1000).optional(),

//     length: Joi.string().required(),
//   }).options({ abortEarly: false });

//   return JoiSchema.validate(movie);
// }

// module.exports = {
//   validateMovie,
// };