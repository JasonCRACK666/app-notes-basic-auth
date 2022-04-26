const { config } = require('dotenv')
config()

module.exports = {
	PORT: process.env.PORT,
	DB_PASSWORD: process.env.DB_PASSWORD,
	DB_DATABASE: process.env.DB_DATABASE,
	SECRET: process.env.SECRET,
	URL_DATABASE: process.env.URL_DATABASE,
}
