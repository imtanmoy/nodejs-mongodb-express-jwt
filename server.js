"use strict"

const express = require("express")
const app = express()
const path = require("path")
const morgan = require("morgan")
const bodyParser = require("body-parser")
const chalk = require('chalk')
require('./config/database')
const middlewaresConfig = require("./config/middlewares")
const routes = require("./app/routes/index")
const PORT = process.env.PORT || 3000

// middlewares
middlewaresConfig(app)

// route
routes(app)

// Set Public Folder
app.use(express.static(path.join(__dirname, "public")))

// catch 404 and forward to error handler
app.use((req, res, next) => {
        const err = new Error("Not Found");
        err.status = 404;
        next(err);
    })
    //error handling
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            // message: err.message
            message: err
        }
    })
})


//app server
app.listen(PORT, err => {
    if (err) {
        throw err
    } else {
        console.log(`Server is running on port ${PORT}!`, chalk.green('✓'))
    }
})