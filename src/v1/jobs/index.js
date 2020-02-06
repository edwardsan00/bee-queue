import express, { response } from 'express'
import jobController from '../../controllers/jobController'
import { createQueue } from '../../controllers/jobController'
import Queue from '../../beeque'

const router = express.Router()

router.get('/status', async (req, res) => {
	try { 
		const status = await Queue.getQueueStatus()
		return res.json({ status, success: true })
	} catch (error){
		res.json({ error: error.message, success: false })
	}
})

router.get('/queue/:id', async (req, res) => {
	try { 
		const { id } = req.params
		const result = await Queue.getQueueById(id)
		if(result){
			const { status } = result
			return res.json({ status, success: true })
		}
		throw new Error('there is no id')
	} catch (error) {
		return res.json({ error: error.message, success: false })
	}
})

router.get('/success', async (req, res) => {
	try {
		const result = await Queue.getQueueSuccess()
		return res.json({ queue: result, success: true })
	} catch (error) {
		return res.json({ error: error.message, success: false })
	}
})

router.get('/pending', async (req, res) => {
	try {
		const result = await Queue.getQueuePending()
		return res.json({ queue: result, success: true })
	} catch (error) {
		return res.json({ error: error.message, success: false })
	}
})

router.get('/clear', async (req, res) => {
	try {
		const result = await Queue.clearQueue()
		if (result)
			return res.json({ success: true })
		throw new Error('Unable to empty records')
	} catch (error) {
		return res.json({ error: error.message, success: false })
	}
})

router.post('/', async (req, res) => {
	try{
		const { id } = req.body
		const data = await createQueue({ id })
    console.log("TCL: data", data)
		if(Boolean(data))
			return res.json({ data, success: true})
		throw new Error(`I can't create the record`)
	} catch (error) {
		return res.json({ error: error.message, success: false })
	}
})

router.delete('/:id', async (req, res) => {
	try {
		const { id } = req.params
		const result = await Queue.removeQueue(id)
    console.log("TCL: result", result)
		return res.json({ success: true })
	} catch(error) {
		res.json({ error: error.message, success: false })
	}
})

export default router