'use strict'
const userApi = require('./user.routes')
const contactApi = require('./contact.routes')

module.exports = (app) => {
    app.use(userApi)
    app.use(contactApi)
}