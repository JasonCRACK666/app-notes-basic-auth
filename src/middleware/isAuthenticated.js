const isAuthenticated = (req, res, next) => {
	if (!req.session.isAuth || !req.session.userId) {
		res.redirect('/')
	} else {
		next()
	}
}

module.exports = isAuthenticated
