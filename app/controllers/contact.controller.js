"use strict";

const HTTPStatus = require("http-status");
const Contact = require("./../models/contact.model");
const AuthService = require("../services/auth.services");

exports.index = async(req, res, next) => {
    // let user = AuthService.authUser(req.headers);
    console.log(req);
    try {
        const allContacts = await Contact.find({ user: req.user._id })
            .sort("-createdAt")
            .populate("user", "firstName lastName email phone");
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
            // const contact = await Contact.findById({ '_id': req.params.id, 'user': user._id }).populate(
            "user",
            "firstName lastName email phone"
        );

        if (!contact.user.equals(req.user._id)) {
            return res.sendStatus(HTTPStatus.UNAUTHORIZED);
        }
        return res.status(HTTPStatus.OK).json(contact);
    } catch (error) {
        return status(HTTPStatus.BAD_REQUEST).json(error);
    }
};

exports.update = async(req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);

        if (!contact.user.equals(req.user._id)) {
            return res.sendStatus(HTTPStatus.UNAUTHORIZED);
        }

        Object.keys(req.body).forEach(key => {
            contact[key] = req.body[key];
        });

        return res.status(HTTPStatus.OK).json(await contact.save());
    } catch (e) {
        return res.status(HTTPStatus.BAD_REQUEST).json(e);
    }
};

exports.destroy = async(req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);

        if (!contact.user.equals(req.user._id)) {
            return res.sendStatus(HTTPStatus.UNAUTHORIZED);
        }

        await contact.remove();
        return res.sendStatus(HTTPStatus.OK);
    } catch (e) {
        return res.status(HTTPStatus.BAD_REQUEST).json(e);
    }
};