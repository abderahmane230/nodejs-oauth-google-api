const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
	userId:{
		type: Number,
	},
	firstName:{
		type: String,
		required: false
	},
	lastName:{
		type: String,
		required: false
	},
	fullName:{
		type: String,
		required: true
	}
}, {
	timestamp: false
})

module.exports = User = mongoose.model('User', userSchema)