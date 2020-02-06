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

router.get('/health', async (req, res) => {
	Queue.getHeath()
	return res.json({ success: true })
})

router.get('/tail/:id', async (req, res) => {
	const { id } = req.params
	await Queue.getTail(id)
	return res.json({ success: true })
})

router.get('/tail', async (req, res) => {
	await Queue.getTails()
	return res.json({ success: true })
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

router.delete('/:id', async (req, res) => {
	try {
		const { id } = req.params
		const result = await Queue.removeQueue(id)
		return res.json({ success: true })
	} catch(error) {
		res.json({ error: error.message, success: false })
	}
})



export default router