import mongoose from 'mongoose'
import connectionBee from '../database'

const BackupSchema = new mongoose.Schema({
	name: String,
	salary: {
		type: Number,
		default: null
	},
	available: {
		type: Boolean,
		default: true
	},
	employees: {
		type: Number,
		default: null
	},
	type: String
}, { timestamps: true })

const Backup = connectionBee.model('Backup', BackupSchema)

export default Backup 
