const mongoose = require('mongoose')
const Participant = require('../models/Participant')

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
}, { timestamps: true })

QuestionSchema.plugin(beautifyUnique)
QuestionSchema.plugin(mongoosePaginate)

QuestionSchema.pre('save', async function(next) {
	const participant = await Participant.findById(this.author)
	participant.amountRegistered++
	await participant.save()

	next()
})

module.exports = mongoose.model('Question', QuestionSchema)
