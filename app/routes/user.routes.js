'use strict'
const express = require("express")
const router = express.Router()

const user = require('./../controllers/user.controller')


router.route('/api').get(user.index)
router.route('/api/signup').post(user.signup)
router.route('/api/signin').post(user.signin)
router.route('/api/signout').post(user.signout)


module.exports = router