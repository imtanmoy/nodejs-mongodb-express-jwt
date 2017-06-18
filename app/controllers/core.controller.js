"use strict"

const HTTPStatus = require("http-status")
const Contact = require("./../models/contact.model")
const AuthService = require('../services/auth.services');

exports.index = async(req, res, next) => {

    // let user = AuthService.authUser(req.headers);
    // console.log(req.user._id)

    try {
        const allContacts = await Contact.list()
        return res.status(HTTPStatus.OK).json(allContacts)
    } catch (error) {
        next(error);
    }
}