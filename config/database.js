'use strict'

const mongoose = require('mongoose')
const { dbURL } = require('./config')

mongoose.Promise = global.Promise;

try {
    mongoose.connect(dbURL);
} catch (err) {
    mongoose.createConnection(dbURL);
}

mongoose.connection
    .once('open', () => console.log('MongoDB Running'))
    .on('error', e => {
        throw e;
    });