"use strict";
const express = require("express");
const router = express.Router();
const validate = require("express-validation");
const user = require("./../controllers/user.controller");
const UserValidation = require("./../validators/user.validations");
const authLocal = require("../services/auth.services");

router.route("/api").get(user.index);
router.route("/api/signup").post(validate(UserValidation.create), user.signup);
router.route("/api/signin").post(authLocal, user.signin);
router.route("/api/signout").post(user.signout);

module.exports = router;