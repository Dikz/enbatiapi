const Participant = require('../models/Participant')

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

			req.io.sockets.emit('newParticipant', participant)
			console.log(req.io.sockets)

			return res.send(participant)

		} catch (err) {
			return res.status(400).send(err)
		}
	}
}

module.exports = new ParticipantController()
