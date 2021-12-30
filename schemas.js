const Joi = require('joi');
module.exports.campgroundSchema = Joi.object({
        campground: Joi.object({
            title: Joi.string().required(),
            price: Joi.number().min(1).integer().required(),
            location: Joi.string().required(),
            description: Joi.string().required(),
            photoUrl: Joi.string().required()
        }).required()
    });