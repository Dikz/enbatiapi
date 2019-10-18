const Participant = require('../models/Participant')
const Question = require('../models/Question')

class ParticipantController {
	async index(req, res) {
		const participants = await Participant.paginate({}, {
			page: req.query.page || 1,
			limit: 10,
		})

		return res.send(participants)
	}

	async show(req, res) {
		try {
			const participant = await Participant.findById(req.params.id).select('+email')

			return res.send(participant)
		} catch (err) {
			return res.status(400).send({ message: "Erro ao buscar esse participante."})
		}
	}

	async store(req, res) {

		const hasRegistered = await Participant.findOne({ email: req.body.email })
		if (hasRegistered) return res.send(hasRegistered)

		try {
			const participant = await Participant.create(req.body)

			req.io.sockets.broadcast.emit('newParticipant', participant)
			console.log(req.io.sockets)

			return res.send(participant)

		} catch (err) {
			return res.status(400).send(err)
		}
	}

	async questions(req, res) {
		try {
			let { id } = req.params
			const questions = await Question.find({ author: id })

			return res.send(questions)
		} catch (err) {
			return res.status(400).send({
				message: "Algo deu errado ao buscar questions desse participante"
			})
		}
	}
}

module.exports = new ParticipantController()
