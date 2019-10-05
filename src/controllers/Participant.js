const Participant = require('../models/Participant')

class ParticipantController {
	async store(req, res) {

		const hasRegistered = await Participant.findOne({ email: req.body.email })
		if (hasRegistered) return res.send(hasRegistered)

		try {
			const participant = await Participant.create(req.body)

			return res.send(participant)
		} catch (err) {
			return res.status(400).send(err)
		}
	}
}

module.exports = new ParticipantController()
