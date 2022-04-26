const { connect } = require('mongoose')
const config = require('./config')

connect(config.URL_DATABASE)
	.then(() => console.log('DB connected is db: ' + config.DB_DATABASE))
	.catch(err => console.error(err))
