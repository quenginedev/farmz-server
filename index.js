const mongoose = require('mongoose')
const server = require('./src/server')
const { mongodb_uri, server_port } = require('./config')

const startServer = async () => {
	await mongoose.connect(mongodb_uri, {useUnifiedTopology: true, useCreateIndex: true, useNewUrlParser: true, useFindAndModify: true})
	server.listen(server_port, ()=>{
		console.log('server started on', server_port)
	})
}

startServer()
	.catch(err=>{
		console.error(err)
	})
