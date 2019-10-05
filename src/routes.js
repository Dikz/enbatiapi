const express = require('express')
const routes = express.Router()

const Participant = require("./controllers/Participant")

routes.get('/', (req, res) => {
	res.send({ message: "Hello World :)" })
})

routes.post('/participants', Participant.store)

module.exports = routes
