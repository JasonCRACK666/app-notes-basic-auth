const { Router } = require('express')
const router = Router()

const User = require('../models/User')

const bcryptjs = require('bcryptjs')

//* LOGIN
router.get('/', async (req, res) => {
	res.render('home')
})

router.post('/login', async (req, res) => {
	try {
		const { email, password } = req.body

		if (!email || !password)
			return res.render('home', {
				message: 'Culo roto debes de poner bien tus datos, culo abierto',
			})

		const user = await User.findOne({ email })
		if (!user)
			return res.render('home', {
				message: 'Mira pelotudo tu email o esta mal, vuelva a intentarlo',
			})

		const matchPassword = await bcryptjs.compare(password, user.password)
		if (!matchPassword)
			return res.render('home', {
				message:
					'Mira chupa pijas tu contraseña esta mal, utilice otra cabeza de nabo B)',
			})

		req.session.isAuth = true
		req.session.userId = user._id

		res.redirect('/notes')
	} catch (err) {
		res.render(err)
	}
})

//* REGISTER
router.get('/register', (req, res) => {
	res.render('register')
})

router.post('/register', async (req, res) => {
	try {
		const { name, lastname, username, email, password } = req.body

		// ? Encryptamos la contraseña
		const salt = await bcryptjs.genSalt(10)
		const hashPassword = await bcryptjs.hash(password, salt)

		const newUser = new User({
			name,
			lastname,
			username,
			email,
			password: hashPassword,
		})

		await newUser.save()

		res.redirect('/')
	} catch (err) {
		res.render('error', { err })
	}
})

// ! DELETE SESSSION
router.get('/logout', (req, res) => {
	req.session.destroy(function (err) {
		res.render('error', { err })
	})
	res.redirect('/')
})

module.exports = router
