const express = require('express')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const path = require('path')
const session = require('express-session')
const MongoDBSession = require('connect-mongodb-session')(session)
const config = require('./config')

const indexRoutes = require('./routes/index.routes')
const notesRouter = require('./routes/notes.routes')

const app = express()

app.set('port', config.PORT)
app.set('views', path.join(__dirname, 'views'))
app.engine(
	'.hbs',
	exphbs.create({
		layoutsDir: path.join(app.get('views'), 'layouts'),
		partialsDir: path.join(app.get('views'), 'partials'),
		defaultLayout: 'main',
		extname: '.hbs',
	}).engine
)
app.set('view engine', '.hbs')

const store = new MongoDBSession({
	uri: config.URL_DATABASE,
	collection: 'MySessions',
})

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))
app.use(
	session({
		secret: config.SECRET,
		resave: false,
		saveUninitialized: false,
		store,
	})
)

app.use(express.static(path.join(__dirname, 'public')))

app.use(indexRoutes)
app.use(notesRouter)

module.exports = app
