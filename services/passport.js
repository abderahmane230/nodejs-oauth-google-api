const googleStrategy = require('passport-google-oauth2').Strategy
const mongoose = require('mongoose')
const User = require('../models/User')

const client_id = process.env.CLIENT_ID
const client_secret = process.env.CLIENT_SECRET

module.exports = (passport) => {
	passport.use(new googleStrategy({
		clientID: client_id,
		clientSecret: client_secret,
		callbackURL: '/auth/google/redirect'
	}, async (accessToken, refreshToken, profile, done) => {

		const newUser = {
			userId: profile.id,
			firstName: profile.name.givenName,
			lastName: profile.name.familyName,
			fullName: profile.displayName,
		}

		try {
			let user = await User.findOne({userId: profile.id})

			if(user){
				done(null, user)
			}
			else{
				user = await User.create(newUser)
				done(null, user)
			}

		} catch(err) {
			console.error(err)
		}

	}))

	passport.serializeUser(function(user, done) {
	  done(null, user.id)
	})

	passport.deserializeUser(function(id, done) {
	  User.findById(id, function(err, user) {
	    done(err, user)
	  })
	})

}