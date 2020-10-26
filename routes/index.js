const router = require('express').Router()
const {ensureAuth} = require('../services/guard')

router.get('/', (req, res) => {
	res.render('index', {pageName:'Index - page'})
})

router.get('/dashboard', ensureAuth,  (req, res) => {
	res.render('home', {pageName:'Home - page', user: req.user})
})


module.exports = router