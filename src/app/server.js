const express = require('express')
const path = require('path')
const app = express()

app.use(express.static(__dirname + '/dist/final'))

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/dist/final/index.html'))
})

const start = async () => {
	try {
			await mongoose.connect('mongodb+srv://testuser:testpass@cluster0.lpyof.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
					useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true
			});
	
			app.listen(process.env.PORT);
			console.log('connected to mongo')
	} catch (err) {
			console.error(`Error on server startup: ${err.message}`);
	}
}


start();