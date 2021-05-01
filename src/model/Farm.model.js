const {Schema, model, Types} = require('mongoose')

const FarmSchema = new Schema({
	name: String,
	farmer_id: {ref: 'farmer', type: Types.ObjectId}
})

const FarmModel = model('farm', FarmSchema)
module.exports = FarmModel

