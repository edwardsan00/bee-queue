import mongoose from 'mongoose'
import connectionBee from '../database'

const JobsSchema = new mongoose.Schema({
	name: String,
	salary: Number,
	available: { 
		type: Boolean,
		default: true
	},
	beeQueueId: {
		type: String,
		default: null
	}
}, { timestamps: true })

const Jobs = connectionBee.model('Jobs', JobsSchema)

export default Jobs 
