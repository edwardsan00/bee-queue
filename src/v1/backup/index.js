import express from 'express'
import { postBackup } from '../../controllers/backupController'
import { getCompanyById } from '../../controllers/companyController'

const router = express.Router()

router.post('/job', async (req, res) => {
	try {
		const job = await getJobsById(id)
		const data = await postBackup({...job, type: 'job'})
		return res.json({ data, success: true })
	} catch (error) {
		return res.json({ error: error.message, success: false })
	}
})

router.post('/company', async (req, res) => {
	try {
		const company = await getCompanyById(id)
		const data = await postBackup({ ...company, type: 'company' })
		return res.json({ data, success: true })
	} catch (error) {
		return res.json({ error: error.message, success: false })
	}
})

export default router