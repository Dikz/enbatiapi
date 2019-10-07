const mongoose = require('mongoose')
const beautifyUnique = require('mongoose-beautiful-unique-validation')

const AvatarSchema = new mongoose.Schema({
	url: {
		type: String,
		unique: true,
		required: true
	},
	approved: {
		type: Boolean,
		default: false
	}
}, { timestamps: true })

AvatarSchema.plugin(beautifyUnique)

AvatarSchema.pre('save', function (next) {
	this.approved = false
	return next()
})

module.exports = mongoose.model('Avatar', AvatarSchema)
