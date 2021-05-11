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
		address: String,
		type: {
			type: String,
			default: 'Point'
		},
		coordinates: [Number]
	}
}, {
	timestamps: true
})

const FarmModel = model('farm', FarmSchema)
module.exports = FarmModel

