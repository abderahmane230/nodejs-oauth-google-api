const mongoose = require('mongoose')

const uri = process.env.URI

module.exports = async function db(){
	try{
		const connection = await mongoose.connect(uri, {useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true })

		connection ? console.log('Connected') : console.log('Something wrong!')
	}
	catch(err){
		console.error(err)
	}
}