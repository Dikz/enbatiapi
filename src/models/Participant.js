const mongoose = require('mongoose')
const beautifyUnique = require('mongoose-beautiful-unique-validation')
const mongoosePaginate = require('mongoose-paginate')

const ParticipantSchema = new mongoose.Schema({
	name: {
		type: String,
		default: "Anônimo",
	},
	email: {
		type: String,
		required: true,
		unique: true,
		select: false
	},
	wishContent: {
		type: Boolean,
		default: false
	}
}, { timestamps: true })

ParticipantSchema.plugin(beautifyUnique)
ParticipantSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Participant', ParticipantSchema)
