'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema


/**
 * User Schema
 */
var UserSchema = new Schema({
    firstName: {
        type: String,
        trim: true,
        required: [true, 'First Name is required']
    },
    lastName: {
        type: String,
        trim: true,
        required: [true, 'Last Name is required']
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        required: [true, 'Email is required']
    },
    phone: {
        type: String,
        unique: true,
        trim: true,
        required: [true, 'Phone is required']
    },
    password: {
        type: String,
        trim: true,
        required: [true, 'Password is required'],
        minlength: [true, 'Password must be longer!!']
    }
})


const User = mongoose.model('User', UserSchema)
module.exports = User