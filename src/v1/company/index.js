import express, { response } from 'express'
import { getCompany, postCompany } from '../../controllers/companyController'

const router = express.Router()

router.get('/', async (req, res) => {
	try {
		const data = await getCompany()
		return res.json({ data, success: true })
	} catch (error) {
		return res.json({ error: error.message, success: false })
	}
})

router.post('/', async (req, res) => {
	try {
		const { name, employees } = req.body
		const data = await postCompany({ name, employees })
		return res.json({ data, success: true })
	} catch (error) {
		return res.json({ error: error.message, success: false })
	}
})

export default router