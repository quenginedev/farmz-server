const farmModel = require('../model/Farm.model')
const {Router} = require('express')
const router = Router()

router.get('/', async (req, res) => {
	res.json(await farmModel.find().populate('_farmer_id', '_id full_name'))
})

router.get('/count', async (req, res) => {
	res.json(await farmModel.count())
})

router.get('/farmer/:farmer_id', async (req, res) => {
	res.json(await farmModel.find({_farmer_id: req.params.farmer_id}).populate('_farmer_id', '_id full_name'))
})

router.put('/:id', async (req, res) => {
	const body = req.body
	const _id = req.params.id
	res.json(await farmModel.updateOne({_id}, body))
})

router.post('/', async (req, res) => {
	res.json(await farmModel.create(req.body))
})

router.delete('/:id', async (req, res) => {
	try {
		const _id = req.params.id
		await farmModel.deleteOne({_id})
		res.json({message: 'farm deleted successfully'})
	} catch (e) {
		console.log(e)
		res.status(500).json({message: 'Error deleting farm'})
	}
})

module.exports = router
