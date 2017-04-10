const express = require('express')
const app = express()
const ServerSentEvents = require('./ServerSentEvents')

const sse = new ServerSentEvents()
let votes = {yes: 0, no: 0}

app.engine('jade', require('jade').__express)
app.set('view engine', 'jade')

app.get('/', (req, res) => {
    res.render('vote')
})

app.get('/result', (req, res) => {
    res.render('result')
})

app.get('/vote', (req, res) => {
    votes[req.query.vote]++

    sse.notifyListeners(votes)
    res.sendStatus(200)
})

app.get('/stream', (req, res) => {
    sse.addListener(req, res, votes)
})

app.listen(3000, () => {
    console.log('Listening on port 3000...')
})