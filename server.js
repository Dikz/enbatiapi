const express = require('express')
const cors = require('cors')

class App {
	constructor() {
		this.express = express()
		this.http = require('http').Server(this.express)
		this.io = require('socket.io')(this.http)

		this.express.use(cors())
		this.express.use(express.json())
		this.express.use(require('./src/routes'))

		this.io.on('connection', socket => {
			console.log(`${socket.id} conectado!`)
		})

		this.express.use((req, res, next) => {
			req.io = this.io

			return next()
		})
	}

}

module.exports = new App().http
