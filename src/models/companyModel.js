import mongoose from 'mongoose'
import connectionBee from '../database'

const CompanySchema = new mongoose.Schema({
	name: String,
	employees: Number,
	available: {
		type: Boolean,
		default: true
	}
}, { timestamps: true })

const Company = connectionBee.model('Company', CompanySchema)

export default Company 
