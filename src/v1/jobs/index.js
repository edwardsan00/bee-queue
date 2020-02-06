import express from 'express'
import jobController from '../../controllers/jobController'
import { getJobs, postJob } from '../../controllers/jobController'
import Queue from '../../beeque'

const router = express.Router()

router.get('/', async (req, res) => {
	try {
		const data = await getJobs()
		return res.json({ data, success: true})
	} catch (error) { 
		return res.json({ error: error.message, success: false })
	}
})

router.post('/', async (req, res) => {
	try{
		const { name, salary } = req.body
		const data = await postJob({ name, salary })
		return res.json({ data, success: true})
	} catch (error) {
		return res.json({ error: error.message, success: false })
	}
})

router.get('/tail', async (req, res) => {
	Queue.getTail()
	return res.json({ success: true })
})

export default router