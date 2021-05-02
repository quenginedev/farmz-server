const {Schema, model, Types} = require('mongoose')

const FarmSchema = new Schema({
	name: String,
	farm_id: {
		type: String,
		unique: true,
		required: true
	},
	_farmer_id: {ref: 'farmer', type: Types.ObjectId},
	farmer_id: {
		type: String,
		required: true
	},
	location: {
		type: String,
		required: true
	}
})

const FarmModel = model('farm', FarmSchema)
module.exports = FarmModel

