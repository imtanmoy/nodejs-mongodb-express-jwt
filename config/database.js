'use strict'

const mongoose = require('mongoose')
const chalk = require('chalk')
const { dbURL } = require('./config')

mongoose.Promise = global.Promise;

try {
    mongoose.connect(dbURL);
} catch (err) {
    mongoose.createConnection(dbURL);
}

mongoose.connection
    .once('open', () => console.log('MongoDB Running', chalk.green('✓')))
    .on('error', err=> {
        console.error(err);
        console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
        process.exit();
    });