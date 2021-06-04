// Route /farmer
const fs = require('fs')
const path = require('path')
const {Router} = require('express')
const FarmerModel = require('../model/Farmer.model')
const FarmModel = require('../model/Farm.model')
const RegionModel = require('../model/Region.model')
const router = Router()
const {Parser} = require('json2csv')


router.post('/', async (req, res) => {
	try {
		let new_farmer = req.body
		let counter = await FarmerModel.count() + 1
		let region = await RegionModel.findById(new_farmer.region)
		if (!region)
			return res.status(400).json({message: 'region not stated'})
		const farmer_id =
			counter +
			`/${upperThreeLetters(new_farmer.full_name)}/` +
			`${upperThreeLetters(new_farmer.community)}/` +
			`${region.region_code}`

		const farmer_doc = await FarmerModel.create({...new_farmer, farmer_id})

		let farm_counter = await FarmModel.count()
		for (let i = 0; i < new_farmer.farm_location.length; i++) {
			let location = new_farmer.farm_location[i]
			const farm_id = `${farm_counter + i + 1}/${farmer_id}/${upperThreeLetters(location.address)}`
			const farm = {
				name: `farm ${i + 1}`,
				_farmer_id: farmer_doc._id,
				farmer_id,
				farm_id,
				location
			}
			await FarmModel.create(farm)
		}
		res.json(farmer_doc)
	} catch (e) {
		console.log(e)
		res.status(500).json(e)
	}
})

router.get('/', async (req, res) => {
	res.json(await FarmerModel.find())
})

router.get('/count', async (req, res) => {
	res.json(await FarmerModel.count())
})

router.get('/download', async (req, res) => {
	const farmers = await FarmerModel.find({})
	const fields = [
		'_id', 'farmer_id', 'full_name', 'gender', 'date_of_birth', 'lang',
		'community', 'household_status', 'dependents_number',
		'marital_status', 'employment_status', 'educational_level',
		'yrs_farming', 'source_income', 'trainee_status', 'level_training',
		'buying_company', 'phone', 'momo',
	]
	const opts = {fields}

	try {
		console.log(farmers[0].full_name)
		const parser = new Parser(opts)
		const csv = parser.parse(farmers)
		const csv_destination = path.join(__dirname, 'farmers.csv')
		fs.writeFileSync(csv_destination, csv)
		res.download(csv_destination)
	} catch (err) {
		console.error(err)
	}
})

router.get('/:id', async (req, res) => {
	const farmer_id = req.params.id
	const farms = await FarmModel.count({_farmer_id: farmer_id})
	const details = await FarmerModel.findById(req.params.id).populate('region')
	res.json({...details.toJSON(), farms})
})


router.put('/:id', async (req, res) => {
	const _id = req.params.id
	const data = req.body
	const updateFarmer = FarmerModel.findOneAndUpdate({_id}, {
		$set: data
	})
	res.json(await updateFarmer)
})

function upperThreeLetters(string = '') {
	console.log({string})
	return string.substr(0, 3).toUpperCase()
}

module.exports = router
