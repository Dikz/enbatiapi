const Avatar = require('../models/Avatar')

class AvatarController {
	async index(req, res) {
		try {
			const avatars = await Avatar.find({ approved: true })
			return res.send(avatars)
		} catch (err) {
			return res.status(400).send(err)
		}
	}

	async store(req, res) {
		try {
			if (req.header('secret') != process.env.SECRET) {
				req.body.approved = false
			}

			const avatar = await Avatar.create(req.body)

			req.io.sockets.emit('newAvatar', avatar)

			return res.send(avatar)
		} catch(err) {
			return res.status(400).send(err)
		}
	}
}

module.exports = new AvatarController()
