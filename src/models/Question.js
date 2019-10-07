const mongoose = require('mongoose')
const beautifyUnique = require('mongoose-beautiful-unique-validation')

const QuestionSchema = new mongoose.Schema({
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Participant',
		required: true
	},
	text: {
		type: String,
		required: true
	}
})

QuestionSchema.plugin(beautifyUnique)

module.exports = mongoose.model('Question', QuestionSchema)
