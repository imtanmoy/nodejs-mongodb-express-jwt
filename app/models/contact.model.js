'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema


/**
 * Contact Schema
 */
var ContactSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        trim: true,
    },
    phone: {
        type: String,
        trim: true,
        required: [true, 'Phone is required']
    },
    imgSrc: {
        type: String,
        default: '',
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
})


ContactSchema.methods = {
    toJSON() {
        return {
            _id: this._id,
            name: this.name,
            email: this.email,
            phone: this.phone,
            user: this.user
        };
    },
}

ContactSchema.statics = {
    list({ skip = 0, limit = 5 } = {}) {
        return this.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .populate('user', 'firstName lastName email phone');
    },
}


const Contact = mongoose.model('Contact', ContactSchema)
module.exports = Contact