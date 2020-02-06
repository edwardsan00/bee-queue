import Bee from 'bee-queue'

const queue = new Bee('tail', {
	activateDelayedJobs: true,
	redis: {
		host: '127.0.0.1',
		port: '6379'
	},
	activateDelayedJobs: true
})

class Queue {
	constructor() {
		this.queue = queue
	}

	createTail(data) {
		return this.queue.createJob(data)
	}

	// removeReminder(reminderId) {
	// 	return this.queue.removeJob(reminderId)
	// }

	processQueue(cb) {
		queue.process((job, done) => {
			try {
				const { data: { _id } = {} } = job
				return done(null, _id)
			} catch (error) {
        console.log("TCL: Queue -> processQueue -> error", error)
				throw error
			}
		})

		cb()
	}

	getTail() {
		// 
		this.queue.getJobs('succeeded', { size: 100 }).then((jobs) => {
			console.log('JObs registrados en redis',jobs)
		})
	}
}

export default new Queue()
