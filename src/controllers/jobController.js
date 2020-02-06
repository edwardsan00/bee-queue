import Jobs from '../models/jobsModel'
import Queue from '../beeque'
import { postBackup } from '../controllers/backupController'

export const getJobs = async () => {
	return await Jobs.find({}).limit(10)
}

export const postJob = async ({ name, salary }) => {
	try {
		const job = await Jobs.create({ name, salary })
		const tailJob = await Queue.createTail(job).save((err, job) => {
			if (err)
				console.log('Fallo el redis')
			else {
				console.log('Se guardo el job')
				return job
			}
		})

		const todayy = new Date()
		const ISOT = todayy.toISOString()
		const late = new Date(todayy)
		late.setMinutes(late.getMinutes() + 1)
		const ISOLate = late.toISOString()

		tailJob.delayUntil(ISOLate)

		tailJob.on('succeeded', (_id) => {
			return ( async () => {
				const data = await Jobs.findById(_id, { __v: 0, createdAt: 0, updatedAt: 0 }).lean()
				await postBackup({ ...data, type: 'job' })
			})()			
    })




	}	catch(err) {
		throw err
	}
}
	// const today = new Date()
	// const tomorrow = new Date(today)
	// tomorrow.setDate(tomorrow.getDate() + 1)
	// const ISOTomorrow = tomorrow.toISOString()
	// Queue.createTail(data)//.delayUntil(ISOTomorrow)
	// 	.save((err, job) => {
	// 		if (err) {
	// 			return console.log('no se guardo')
	// 		}
	// 		return console.log('Se guardo el job:', job)
	// 	})


export const getJobsById = async (_id) => {
	return await Jobs.find(_id)
}