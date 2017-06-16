"use strict";

const HTTPStatus = require("http-status");
const Contact = require("./../models/contact.model");
const AuthService = require('../services/auth.services');


exports.index = async(req, res) => {
    let user = AuthService.authUser(req.headers);
    try {
        const allContacts = await Contact.find({ 'user': user._id }).sort('-createdAt').populate("user", 'firstName lastName email phone');
        return res.status(HTTPStatus.OK).jsonp(allContacts);
    } catch (error) {
        next(error);
    }
};

exports.list = async(req, res) => {
    // const limit = parseInt(req.query.limit, 0);
    const limit = parseInt(req.params.limit, 0);
    const skip = parseInt(req.params.skip, 0);
    console.log(req.params);
    try {
        const contactList = await Contact.list({
            limit,
            skip
        });
        return res.status(HTTPStatus.OK).json(contactList);
    } catch (error) {
        next(error);
    }
};

exports.create = async(req, res, next) => {
    console.log(req.body);
    try {
        const contact = await Contact.create(req.body);
        return res.status(HTTPStatus.CREATED).json(contact);
    } catch (error) {
        // next(error);
        return status(HTTPStatus.BAD_REQUEST).json(error);
    }
};

exports.show = async(req, res, next) => {
    try {
        const contact = await Contact.findById(req.params.id).populate(
            "user",
            "firstName lastName email phone"
        );
        return res.status(HTTPStatus.OK).json(contact);
    } catch (error) {
        return status(HTTPStatus.BAD_REQUEST).json(error);
    }
};

exports.update = (req, res) => {
    res.status(HTTPStatus.OK).json({
        message: "Contact Updated"
    });
};

exports.destroy = (req, res) => {
    res.status(HTTPStatus.OK).json({
        message: "Contact deleted"
    });
};