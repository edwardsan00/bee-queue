import Bee from 'bee-queue'

const queue = new Bee('queue', {
	activateDelayedJobs: true,
	redis: {
		host: '127.0.0.1',
		port: '6379'
	},
	activateDelayedJobs: true,
})

class Queue {
	constructor() {
		this.queue = queue
	}

	createQueue(data) {
		return this.queue.createJob(data)
	}

	removeQueue(id) {
		return this.queue.removeJob(id)
	}

	processQueue(cb) {
		queue.process((job, done) => {
			try {
				const { id } = job
				return done(null, id)
			} catch (error) {
				console.log("TCL: Queue -> processQueue -> error", error)
				throw error
			}
		})

		cb()
	}

	getQueueById(id) {
		return this.queue.getJob(id, (err, job) => {
			return job
		})
	}

	getQueueSuccess() {
		return this.queue.getJobs('succeeded', { size: 100 }).then((jobs) => {
			return jobs.map((job) => job.id )
		})
	}

	getQueuePending() {
		return this.queue.getJobs('delayed', { start: 0, end: 100 }).then((jobs) => {
			return jobs.map((job) => job.id)
		})
	}

	async getQueueStatus() {
		return await this.queue.checkHealth()
	}

	clearQueue() {
		return this.queue.destroy((err) => {
			if (!err) {
				return true
			}
			return false
		})
	}
}

export default new Queue()
