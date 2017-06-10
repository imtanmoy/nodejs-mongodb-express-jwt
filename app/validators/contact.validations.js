'use strict';
const Joi = require('joi')



// exports.default = {
//     createContact: {
//         body: {
//             name: Joi.string().min(3).required(),
//             email: Joi.string().min(10).email().required(),
//             phone: Joi.string().min(11).required(),
//         }
//     }
// }


exports.createContact = {
    body: {
        name: Joi.string().min(3).required(),
        email: Joi.string().min(10).email().required(),
        phone: Joi.string().min(11).required(),
    }
}