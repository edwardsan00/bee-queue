import Jobs from '../models/jobsModel'
import Queue from '../beeque'

export const formatDateQueue = (unit, time) => {
	const today = new Date()
	const ISOToday = today.toISOString()
	const nextDate = new Date(today)
	
	if(unit === 'minutes'){
		nextDate.setMinutes(nextDate.getMinutes() + time)
	}
	if(unit === 'hours')
		nextDate.setHours(nextDate.getHours() + time)

	return Date.parse(nextDate.toISOString())
}

export const createQueue = async ({ id, source = 'activitieKrowders'  }) => {
	try {
		const delayDate = formatDateQueue('minutes', 1)
		const saveRedis = { id, source }
		const dataQueue = await Queue.createQueue(saveRedis)
			.setId(id.toString())
			.delayUntil(delayDate)
			.save((err, redisJob) => {
				const { status, data } = redisJob
				return { status, data }
			})

		dataQueue.on('succeeded', (id) => {
    	console.log("TCL: postJob -> _id", id)		
    })

	}	catch(err) {
		throw err
	}
}