const mongoose = require('mongoose')
const beautifyUnique = require('mongoose-beautiful-unique-validation')
const mongoosePaginate = require('mongoose-paginate')

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
QuestionSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Question', QuestionSchema)
