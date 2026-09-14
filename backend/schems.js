const Joi = require('joi');

const campgroundSchema = Joi.object({
    title: Joi.string().required(),
    // image: Joi.string().required(),
    price: Joi.number().required().min(0),
    description: Joi.string().required(),
    location: Joi.string().required(),
    deleteImages: Joi.array()
        .items(Joi.string())
        .single()
}).required();

const reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        body: Joi.string().required()
    }).required()
});

module.exports = {
    campgroundSchema,
    reviewSchema
};