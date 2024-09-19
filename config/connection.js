//Require mongoose
const {connect,connection} = require('mongoose')
// Required for getting database name from .env file
require('dotenv').config()

//Connection to mongo database
const connectionString = `mongodb://127.0.0.1:27017/${process.env.DB_NAME}`
connect(connectionString)

module.exports = connection