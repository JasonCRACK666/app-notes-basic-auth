const app = require('./app')
require('./db')

app.listen(app.get('port'), () => {
	console.log(`Server is running on port ${app.get('port')}`)
})
