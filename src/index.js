import '@babel/polyfill'
import express from 'express'
import Queue from './beeque'

import app from './app'

app.listen(3000, function () {
	console.log("Node server running on http://localhost:3000")
	Queue.processQueue(() => console.log('Se ejecto process del job'))
});