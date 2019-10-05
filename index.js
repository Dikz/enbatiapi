require('dotenv').config()

const server = require('./server')
const mongoose = require('mongoose')

mongoose.connect(process.env.DB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true
},
	async err => {
		if (err) return console.error(err)

		server.listen(process.env.PORT || 3000, () => {
			console.log("API Online!")
		})
})


