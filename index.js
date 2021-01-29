require('dotenv').config()

const logger = require('morgan')('dev')
const express = require('express')
const app = express()

app.use(express.json())
app.use(logger)

// Routes go here
const controllers = require('./src/controllers')

app.get('/', controllers.root)
app.post('/validate-rule', controllers.root)

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server created and listening on: ${process.env.SERVER_PORT}`)
})