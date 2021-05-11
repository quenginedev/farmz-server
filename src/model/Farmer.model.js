const {Schema, model} = require('mongoose')
// const { v4 } = require('uuid')

const FarmerSchema = new Schema({
	farmer_id: String,
	full_name: {
		type: String,
		required: true
	},
	date_of_birth: {
		type: String,
		required: true
	},
	gender: {
		type: String,
		enum: ['male', 'female', 'other'],
		default: 'other'
	},
	community: {
		type: String,
		required: true
	},
	region: {
		type: String,
		required: true
	},
	household_status: {
		type: String,
		required: true
	},
	dependents_number: {
		type: Number,
		required: true
	},
	marital_status: {
		type: String,
		required: true
	},
	employment_status: {
		type: String,
		required: true,
		enum: ['artisan', 'farming', 'others']
	},
	educational_level: {
		type: String,
		required: true,
		enum: ['primary', 'jhs', 'shs/vocational', 'tertiary', 'none']
	},
	yrs_farming: {
		type: Date,
		required: true
	},
	source_income: {
		type: String,
		required: true
	},
	lang: {
		type: String,
		required: true,
		enum: ['English', 'Ga', 'Twi', 'Other']
	},
	trainee_status: {
		type: String,
		required: true,
		enum: ['Owner', 'Worker']
	},
	level_training: {
		type: Number,
		required: true,
		enum: [1, 2, 3, 4],
	},
	phone: {
		type: String,
		required: true
	},
	momo: {
		type: String,
		required: true
	},
	buying_company: {
		type: String,
		required: true
	},
	picture: {
		type: String,
		required: true
	},
	disabled: Boolean
})


const FarmerModel = model('farmer', FarmerSchema)
module.exports = FarmerModel
