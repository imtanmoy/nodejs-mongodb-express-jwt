const express = require("express")
const router = express.Router()
const validate = require('express-validation')
const contact = require('./../controllers/contact.controller')
const contactValidation = require('./../validators/contact.validations')
const authService = require("../services/auth.services");


router.route('/api/contact')
    .get(authService.authJwt, contact.index)
    .post(authService.authJwt, validate(contactValidation.createContact), contact.create)

router.route('/api/contact/:id')
    .get(authService.authJwt, contact.show)
    .put(authService.authJwt, contact.update)
    .delete(authService.authJwt, contact.destroy)

router.route('/api/contact/:limit/:skip').get(authService.authJwt, contact.list)


module.exports = router