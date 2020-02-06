import express from 'express'

import jobs from './jobs'
import company from './company'
import backup from './backup'

const router = express.Router()

router.get('/', async (req, res) => {
	res.send('v1')
})

router.use('/jobs', jobs)
router.use('/company', company)
router.use('/backup', backup)

export default router
