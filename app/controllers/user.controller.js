'use strict'

const HTTPStatus = require('http-status')

exports.index = (req, res) => {
    res.status(HTTPStatus.OK).json({
        message: 'Index Page'
    })
}


exports.signup = (req, res) => {
    res.status(HTTPStatus.OK).json({
        message: 'User Signup Successfull'
    })
}


exports.signin = (req, res) => {
    res.status(HTTPStatus.OK).json({
        message: 'IUser Signin Successfull'
    })
}

exports.signout = (req, res) => {
    res.status(HTTPStatus.OK).json({
        message: 'User Signout Successfull'
    })
}