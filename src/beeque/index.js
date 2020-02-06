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
		return this.queue.removeJob(id, (err) => {
			if(!err)
				return { success: true }
			throw new Error(`Couldn't remove queue id: ${id}`)
		})
	}

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

	getTail(number) {
    console.log("TCL: Queue -> getTail -> number", number)
		this.queue.getJob(number, (err, job) => {
			console.log(`JOB NUMER`,number, job)
		})
	}

	getTails() {
		this.queue.getJobs('succeeded', { size: 100 }).then((jobs) => {
			console.log('JObs registrados en redis',jobs.length)
		})
	}

	async getHeath() {
		const test = await this.queue.checkHealth()
    console.log("TCL: getHeath -> test", test)
	}
}

export default new Queue()
