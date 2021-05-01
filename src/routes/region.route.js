const {Router} = require('express')
const RegionModel = require('../model/Region.model')
const router = Router()

router.get('/', async (req, res)=>{
	res.json(await RegionModel.find())
})

router.post('/many', async (req, res)=>{
	const regions = req.body
	res.json(
		await RegionModel.insertMany(regions)
	)
})

module.exports = router
