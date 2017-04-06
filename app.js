const express = require('express')
const app = express()
const sse = require('./sse')

const connections = []
let votes = {yes: 0, no: 0}

app.engine('jade', require('jade').__express)
app.set('view engine', 'jade')

app.use(sse)

app.get('/', function (req, res) {
    res.render('vote')
})

app.get('/result', function (req, res) {
    res.render('result')
})

app.get('/vote', function (req, res) {
    votes[req.query.vote]++

    connections.forEach((connection) => {
        connection.sseSend(votes)
    })

    res.sendStatus(200)
})

app.get('/stream', function (req, res) {
    res.sseSetup()
    res.sseSend(votes)
    connections.push(res)
})

app.listen(3000, function () {
    console.log('Listening on port 3000...')
})