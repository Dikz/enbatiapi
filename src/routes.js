const express = require('express')
const routes = express.Router()
const { resolve } = require('path')

const Participant = require("./controllers/Participant")
const Question = require("./controllers/Question")
const Avatar = require("./controllers/Avatar")

routes.get('/', (req, res) => {
	res.send({ message: "Hello World :)" })
})

routes.use('/images', express.static(resolve(__dirname, 'img')))

// # Participante
routes.get('/participants', Participant.index)
routes.get('/participants/:id', Participant.show)
routes.get('/participants/:id/questions', Participant.questions)
routes.post('/participants', Participant.store)

// Question
routes.get('/questions', Question.index)
routes.get('/questions/:id', Question.show)
routes.post('/questions', Question.store)

// Avatar
routes.get('/avatars', Avatar.index)
routes.get('/random/:amount', Avatar.random)
routes.post('/avatars', Avatar.store)

module.exports = routes
