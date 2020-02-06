import mongoose from 'mongoose'

const connectionBee = mongoose.createConnection('mongodb://localhost:27017', {
	useFindAndModify: false,
	useNewUrlParser: true,
})

export default connectionBee