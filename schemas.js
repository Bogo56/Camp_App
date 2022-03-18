const Joi = require("joi");

// Serverside validation on form data using 'Joi' Schema Framework

const schemaDestination = Joi.object({
  formData: Joi.object({
    // img: Joi.string()
    // .min(3)
    // .required(),
    location: Joi.string().required(),
    price: Joi.number().min(5).required(),
    title: Joi.string().min(2).required(),
  }).required(),
  imgsToDelete: [Joi.array(), Joi.string()],
});

const schemaReview = Joi.object({
  reviewInfo: Joi.object({
    rating: Joi.number().required(),
    review: Joi.string().required(),
  }).required(),
});

const schemaUser = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
  email: Joi.string().required(),
});

module.exports = { schemaReview, schemaDestination, schemaUser };
