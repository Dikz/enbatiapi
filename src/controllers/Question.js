const Question = require('../models/Question')

class QuestionController {
	async index(req, res) {
		try {
			const questions = await Question.paginate({}, {
				page: req.query.page || 1,
				limit: 10,
				populate: 'author'
			})

			return res.send(questions)
		} catch(err) {
			return res.status(400).send(err)
		}
	}

	async store(req, res) {
		try {
			const question = await Question.create(req.body)

			req.io.sockets.emit('newQuestion', question)

			return res.send(question)
		} catch(err) {
			console.log(err)
			return res.status(400).send(err)
		}

	}

	async show(req, res) {
		try {
			const question = await Question.findOne({ _id: req.params.id }).populate('author')

			if (!question) return res.status(400).send({
				message: "Essa question não existe!"
			})

			return res.send(question)
		} catch (err) {
			return res.status(400).send(err)
		}
	}
}

module.exports = new QuestionController()
