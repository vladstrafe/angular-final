const mongoose = require('mongoose')

const Truck = mongoose.model('Truck', {
	created_by: {
		type: mongoose.Schema.Types.ObjectId,
	},
	assigned_to: {
		type: mongoose.Schema.Types.ObjectId,
		default: null
	},
	type: {
		type: String,
		enum: ['SPRINTER', 'SMALL_STRAIGHT', 'LARGE_STRAIGHT'],
		required: true
	},
	status: {
		type: String,
		enum: ['IS', 'OL'],
		default: 'IS'
	},
	created_date: {
		type: Date,
		default: Date.now()
	}
})

module.exports = { Truck }