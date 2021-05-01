const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const server = express()
const farmerRouter = require('./routes/farmer.route')
const farmRouter = require('./routes/farm.route')
const regionRouter = require('./routes/region.route')

//Middleware
server.use(cors())
server.use(bodyParser.json({ limit: "50mb" }))
server.use(morgan('dev'))

// Routes
server.use('/farmer', farmerRouter)
server.use('/region', regionRouter)
server.use('/farm', farmRouter)
server.all('*', (req, res)=>{
	res.json({
		message: 'Farmers API'
	})
})

module.exports = server
