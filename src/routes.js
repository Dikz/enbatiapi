const express = require('express')
const routes = express.Router()
const fs = require('fs')

const Participant = require("./controllers/Participant")
const Question = require("./controllers/Question")

routes.get('/', (req, res) => {
	res.send({ message: "Hello World :)" })
})

routes.use('/images', express.static(__dirname + '/img'))

routes.get('/participants', Participant.index)
routes.post('/participants', Participant.store)

routes.get('/questions/:id', Question.show)
routes.post('/questions', Question.store)

module.exports = routes
