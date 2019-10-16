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

	async random(req, res) {
		try {
			let avatars = await Avatar.find({ approved: true })
			shuffleArray(avatars)

			if (!/\d/gm.test(req.params.amount)) return res.status(400).send(
				{ message: "A quantidade informada deve ser um número!" }
			)

			return res.send(avatars.slice(0, req.params.amount))
		} catch (err) {
			return res.status(400).send(err)
		}
	}
}

function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
	}
}

module.exports = new AvatarController()
