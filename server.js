const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const session = require('express-session')
const passport = require('passport')
const dotenv = require('dotenv')
const cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet')

// Requiring dotenv
dotenv.config({path: "./config/config.env"})

// (.env file) and other variables
const port = process.env.PORT || 2000
const mode = process.env.MODE
const secret = process.env.SECRET || 'cat cat cat knockout'

// Starting app
const app = express()

// Database connection
const db = require('./config/database.js')
db()

// Express middlewares
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(expressLayouts)
app.use(session({
	secret: secret,
	resave: true,
	saveUninitialized: false
}))

// Passport strategy config
require('./services/passport')(passport)

// Passport middlewares
app.use(passport.initialize())
app.use(passport.session())

// Cors, Helmet and Morgan middlewares
app.use(cors())
app.use(helmet())

if(mode == "dev"){
	app.use(morgan('dev'))
}

// Ejs engine 
app.set('view engine', 'ejs')

// Routes folder
app.use('/', require('./routes/index.js'))
app.use('/auth', require('./routes/auth.js'))

// Starting server
app.listen(port, () => console.log(`App mode is: ${mode}, running on port: ${port}`))