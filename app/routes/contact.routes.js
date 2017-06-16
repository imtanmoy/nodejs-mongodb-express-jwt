const express = require("express")
const router = express.Router()
const validate = require('express-validation')
const contact = require('./../controllers/contact.controller')
const contactValidation = require('./../validators/contact.validations')
const authService = require("../services/auth.services");


router.route('/api/contact')
    .get(authService.authJwt, contact.index)
    .post(authService.authJwt, validate(contactValidation.createContact), contact.create)
    .put(contact.update)
    .delete(contact.destroy)

router.route('/api/contact/:id').get(contact.show)
router.route('/api/contact/:limit/:skip').get(contact.list)


module.exports = router