// Route /farmer
const { Router } = require('express')
const FarmerModel = require('../model/Farmer.model')
const FarmModel = require('../model/Farm.model')
const router = Router()

router.post('/', async (req, res)=>{
	try{
		let new_farmer = req.body
		const farmer_doc = await FarmerModel.create(new_farmer)
		for(let i = 0; i < new_farmer.farms; i++ ){
			await FarmModel.create({name: `farm ${i + 1}`, farmer_id: farmer_doc._id})
		}
		res.json(farmer_doc)
	}catch (e){
		console.log(e)
		res.status(500).json(e)
	}
})

router.get('/', async (req, res)=>{
	res.json(await FarmerModel.find())
})

router.get('/count', async (req, res)=>{
	res.json(await FarmerModel.count())
})

router.get('/:id', async (req, res)=>{
	res.json(await FarmerModel.findById(req.params.id).populate('region'))
})


module.exports = router
