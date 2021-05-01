const { Schema, model } = require('mongoose')

const RegionSchema = new Schema({
	region_code: {
		type: String,
		unique: true,
		required: true,
		max: 2,
	},
	region: {
		type: String,
		required: true,
		unique: true
	},
	// status: Boolean,
	deleted: {
		type: Boolean,
		default: false
	}
})

const RegionModel = model('region', RegionSchema)
module.exports = RegionModel
