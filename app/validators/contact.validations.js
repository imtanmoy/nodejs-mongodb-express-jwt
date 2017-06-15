'use strict'
const Joi = require('joi')


exports.createContact = {
    body: {
        name: Joi.string().min(3).required(),
        email: Joi.string().email().required(),
        phone: Joi.string().min(5).required(),
    }
}