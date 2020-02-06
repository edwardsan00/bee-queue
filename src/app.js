import express from 'express'
import morgan from 'morgan'
import v1 from './v1'

const app = express()
const router = express.Router()

morgan('tiny')
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

router.get('/', function (req, res) {
	res.send("Hello World!")
});

router.use('/v1', v1)
app.use(router)


export default app
