const { Router } = require('express')
const router = Router()

const isAuth = require('../middleware/isAuthenticated')

const Note = require('../models/Note')
const User = require('../models/User')

//* GET NOTES
router.get('/notes', isAuth, async (req, res) => {
	try {
		const notas = await Note.find({ user: req.session.userId }).lean()
		res.render('notes', { notes: notas })
	} catch (err) {
		res.render('error', { err })
	}
})

//* CREATE NOTES
router.get('/notes/add', isAuth, (req, res) => {
	res.render('add')
})

router.post('/notes/add', isAuth, async (req, res) => {
	try {
		const { title, content } = req.body

		const user = await User.findById(req.session.userId)

		const newNote = new Note({
			title,
			content,
			user: user._id,
		})

		const saveNote = await newNote.save()
		user.notes = user.notes.concat(saveNote._id)
		await user.save()

		res.redirect('/notes')
	} catch (err) {
		console.error(err)
	}
})

//! DELETE NOTES
router.get('/notes/delete/:noteId', isAuth, async (req, res) => {
	try {
		const { noteId } = req.params
		await Note.findByIdAndDelete(noteId)
		res.redirect('/notes')
	} catch (err) {
		res.render('error', { err })
	}
})

// ? UPDATE NOTES
router.get('/notes/edit/:noteId', isAuth, async (req, res) => {
	try {
		const { noteId } = req.params
		const note = await Note.findById(noteId).lean()
		res.render('edit', { note })
	} catch (err) {
		res.render('error', { err })
	}
})

router.post('/notes/edit/:noteId', isAuth, async (req, res) => {
	try {
		const { noteId } = req.params
		await Note.findByIdAndUpdate(noteId, req.body)
		res.redirect('/notes')
	} catch (err) {
		res.render('error', { err })
	}
})

//* TOGGLE IMPORTANT
router.get('/notes/:noteId/toggle-important', async (req, res) => {
	const { noteId } = req.params
	const note = await Note.findById(noteId)

	note.important = !note.important

	await note.save()

	res.redirect('/notes')
})

module.exports = router
