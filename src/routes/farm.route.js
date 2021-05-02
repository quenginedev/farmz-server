const farmModel = require('../model/Farm.model')
const { Router } = require('express')
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
	const name = req.body.name
	res.json(await farmModel.updateOne({_id: req.params.id}, {name}))
})

router.post('/', async (req, res) => {
	res.json(await farmModel.create(req.body))
})


module.exports = router
